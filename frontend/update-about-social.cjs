const fs = require('fs');
const file = 'c:/Users/gamin/OneDrive/Documents/project web/web/frontend/src/pages/About.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add icon import
content = content.replace(
  /Award,\s*Users,\s*HeartHandshake,\s*Compass,\s*GraduationCap,\s*ArrowRight/g,
  "Award, \n  Users, \n  HeartHandshake, \n  Compass, \n  GraduationCap,\n  ArrowRight,\n  Link as LinkIcon"
);

// Update member render
content = content.replace(
  /<p className="text-xs text-on-surface-variant leading-relaxed">\s*\{member.description\}\s*<\/p>/g,
  `<p className="text-xs text-on-surface-variant leading-relaxed">
                  {member.description}
                </p>
                {member.socialLink && (
                  <a href={member.socialLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-display font-bold text-secondary hover:text-secondary-container transition-colors">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Profil Sosial</span>
                  </a>
                )}`
);

// Update advisor render
content = content.replace(
  /<p className="text-xs text-on-surface-variant leading-relaxed">\s*\{advisor.description\}\s*<\/p>/g,
  `<p className="text-xs text-on-surface-variant leading-relaxed">
                  {advisor.description}
                </p>
                {advisor.socialLink && (
                  <a href={advisor.socialLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-display font-bold text-secondary hover:text-secondary-container transition-colors">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Profil Sosial</span>
                  </a>
                )}`
);

fs.writeFileSync(file, content);
console.log('About.tsx updated');
