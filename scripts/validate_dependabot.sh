#!/bin/bash
# Validate Dependabot configuration

set -e

echo "🔍 Validating Dependabot configuration..."
echo "=========================================="

# Check if dependabot.yml exists
if [ ! -f ".github/dependabot.yml" ]; then
    echo "❌ Error: .github/dependabot.yml not found"
    exit 1
fi

# Validate YAML syntax
echo "✅ Checking YAML syntax..."
python3 -c "import yaml; yaml.safe_load(open('.github/dependabot.yml'))" || {
    echo "❌ YAML syntax error in .github/dependabot.yml"
    exit 1
}

# Check required fields
echo "✅ Checking configuration structure..."
python3 -c "
import yaml
config = yaml.safe_load(open('.github/dependabot.yml'))
assert config.get('version') == 2, 'Version must be 2'
assert 'updates' in config, 'Updates section required'
assert len(config['updates']) >= 2, 'At least npm and github-actions ecosystems required'

ecosystems = [update['package-ecosystem'] for update in config['updates']]
assert 'npm' in ecosystems, 'npm ecosystem required'
assert 'github-actions' in ecosystems, 'github-actions ecosystem required'

for update in config['updates']:
    assert 'schedule' in update, 'Schedule required for each ecosystem'
    assert update['schedule']['interval'] == 'daily', 'Daily interval required'
    
print('✅ Configuration structure is valid')
"

echo ""
echo "🎉 Dependabot configuration validation complete!"
echo ""
echo "Configured ecosystems:"
python3 -c "
import yaml
config = yaml.safe_load(open('.github/dependabot.yml'))
for update in config['updates']:
    eco = update['package-ecosystem']
    schedule = update['schedule']['interval']
    print(f'  • {eco}: {schedule} updates')
"

echo ""
echo "Next steps:"
echo "1. Commit and push the configuration to enable Dependabot"
echo "2. Check GitHub repository settings > Security > Code security and analysis"
echo "3. Monitor for automated pull requests starting tomorrow"