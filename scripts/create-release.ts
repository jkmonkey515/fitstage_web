import { versionManager } from './version-update';

async function createRelease() {
  const type = process.argv[2] as 'major' | 'minor' | 'patch';
  const description = process.argv[3];
  const changes = process.argv.slice(4);

  if (!type || !description || changes.length === 0) {
    console.error('Usage: npm run release [major|minor|patch] "description" "change1" "change2" ...');
    process.exit(1);
  }

  try {
    await versionManager.createUpdate(type, description, changes);
    console.log('Release created successfully!');
  } catch (error) {
    console.error('Error creating release:', error);
    process.exit(1);
  }
}

createRelease();