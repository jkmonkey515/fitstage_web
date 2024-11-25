import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface Version {
  major: number;
  minor: number;
  patch: number;
}

interface VersionUpdate {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  description: string;
  changes: string[];
  files: string[];
  migrations: string[];
}

class VersionManager {
  private versionFile: string;
  private buildDir: string;
  private distDir: string;

  constructor() {
    this.versionFile = path.join(process.cwd(), 'version.json');
    this.buildDir = path.join(process.cwd(), 'build');
    this.distDir = path.join(process.cwd(), 'dist');
  }

  private parseVersion(version: string): Version {
    const [major, minor, patch] = version.split('.').map(Number);
    return { major, minor, patch };
  }

  private incrementVersion(current: string, type: 'major' | 'minor' | 'patch'): string {
    const version = this.parseVersion(current);
    
    switch (type) {
      case 'major':
        version.major += 1;
        version.minor = 0;
        version.patch = 0;
        break;
      case 'minor':
        version.minor += 1;
        version.patch = 0;
        break;
      case 'patch':
        version.patch += 1;
        break;
    }

    return `${version.major}.${version.minor}.${version.patch}`;
  }

  public async createUpdate(type: 'major' | 'minor' | 'patch', description: string, changes: string[]): Promise<void> {
    const versionData = JSON.parse(fs.readFileSync(this.versionFile, 'utf-8'));
    const currentVersion = versionData.version;
    const newVersion = this.incrementVersion(currentVersion, type);

    // Create new update entry
    const update: VersionUpdate = {
      version: newVersion,
      date: new Date().toISOString().split('T')[0],
      type,
      description,
      changes,
      files: this.getChangedFiles(),
      migrations: this.getMigrationFiles()
    };

    // Update version file
    versionData.version = newVersion;
    versionData.lastUpdate = update.date;
    versionData.updates.unshift(update);

    fs.writeFileSync(this.versionFile, JSON.stringify(versionData, null, 2));

    // Create release bundle
    await this.createReleaseBundle(newVersion);
  }

  private getChangedFiles(): string[] {
    try {
      const gitStatus = execSync('git diff --name-only HEAD').toString();
      return gitStatus.split('\n').filter(file => file.trim() !== '');
    } catch (error) {
      console.error('Error getting changed files:', error);
      return [];
    }
  }

  private getMigrationFiles(): string[] {
    const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
    return fs.readdirSync(migrationsDir).filter(file => file.endsWith('.sql'));
  }

  private async createReleaseBundle(version: string): Promise<void> {
    const releaseDir = path.join(this.distDir, `release-${version}`);
    
    // Ensure release directory exists
    if (!fs.existsSync(releaseDir)) {
      fs.mkdirSync(releaseDir, { recursive: true });
    }

    // Copy build files
    if (fs.existsSync(this.buildDir)) {
      fs.cpSync(this.buildDir, path.join(releaseDir, 'build'), { recursive: true });
    }

    // Copy migrations
    const migrationsDir = path.join(releaseDir, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    const migrations = this.getMigrationFiles();
    migrations.forEach(migration => {
      fs.copyFileSync(
        path.join(process.cwd(), 'supabase', 'migrations', migration),
        path.join(migrationsDir, migration)
      );
    });

    // Create version info file
    const versionInfo = {
      version,
      buildDate: new Date().toISOString(),
      migrations
    };
    fs.writeFileSync(
      path.join(releaseDir, 'version-info.json'),
      JSON.stringify(versionInfo, null, 2)
    );
  }
}

export const versionManager = new VersionManager();