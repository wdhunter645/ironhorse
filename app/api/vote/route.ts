import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { matchupId, choice } = await request.json();

    if (!matchupId || !choice || !['A', 'B'].includes(choice)) {
      return Response.json({ error: 'matchupId and choice (A or B) required' }, { status: 400 });
    }

    // Create voter fingerprint from IP and user agent
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const voterFingerprint = crypto
      .createHash('sha256')
      .update(`${ip}-${userAgent}`)
      .digest('hex')
      .substring(0, 16);

    const supabase = createClient();

    // Check if user already voted for this matchup
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('matchup_id', matchupId)
      .eq('voter_fingerprint', voterFingerprint)
      .single();

    if (existingVote) {
      return Response.json({ error: 'You have already voted for this matchup' }, { status: 400 });
    }

    // Verify matchup exists and is active
    const { data: matchup, error: matchupError } = await supabase
      .from('matchups')
      .select('id, status, starts_at, ends_at')
      .eq('id', matchupId)
      .single();

    if (matchupError || !matchup) {
      return Response.json({ error: 'Matchup not found' }, { status: 404 });
    }

    const now = new Date();
    const startsAt = new Date(matchup.starts_at);
    const endsAt = new Date(matchup.ends_at);

    if (now < startsAt || now > endsAt || matchup.status !== 'active') {
      return Response.json({ error: 'Voting is not currently open for this matchup' }, { status: 400 });
    }

    // Record the vote
    const { error: voteError } = await supabase
      .from('votes')
      .insert({
        matchup_id: matchupId,
        choice,
        voter_fingerprint: voterFingerprint
      });

    if (voteError) {
      console.error('Vote insert error:', voteError);
      return Response.json({ error: 'Failed to record vote' }, { status: 500 });
    }

    // Get updated vote counts
    const { data: voteCounts, error: countError } = await supabase
      .from('votes')
      .select('choice')
      .eq('matchup_id', matchupId);

    if (countError) {
      console.error('Vote count error:', countError);
      // Still return success since vote was recorded
      return Response.json({ 
        success: true, 
        message: 'Vote recorded',
        counts: { A: 0, B: 0 }
      });
    }

    const counts = voteCounts.reduce((acc: any, vote: any) => {
      const choice = vote.choice as 'A' | 'B';
      acc[choice] = (acc[choice] || 0) + 1;
      return acc;
    }, { A: 0, B: 0 });

    // Set a cookie to remember this vote
    const cookieHeader = `voted_${matchupId}=${choice}; Max-Age=604800; Path=/; SameSite=Strict`;

    return Response.json(
      { 
        success: true, 
        message: 'Vote recorded successfully',
        choice,
        counts
      },
      {
        headers: {
          'Set-Cookie': cookieHeader
        }
      }
    );

  } catch (error) {
    console.error('Vote API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}