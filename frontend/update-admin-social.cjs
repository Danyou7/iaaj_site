const fs = require('fs');
const file = 'c:/Users/gamin/OneDrive/Documents/project web/web/frontend/src/pages/admin/AdminAbout.tsx';
let content = fs.readFileSync(file, 'utf8');

// Update memberForm state
content = content.replace(
  /name: '', role: '', period: '', description: '', imagePreview: '', file: null as File \| null/g,
  "name: '', role: '', period: '', description: '', socialLink: '', imagePreview: '', file: null as File | null"
);
content = content.replace(
  /name: '', role: '', period: '', description: '', imagePreview: '', file: null/g,
  "name: '', role: '', period: '', description: '', socialLink: '', imagePreview: '', file: null"
);
content = content.replace(
  /description: m.description, \n        imagePreview: m.image \|\| '', file: null/g,
  "description: m.description, socialLink: m.socialLink || '', \n        imagePreview: m.image || '', file: null"
);
content = content.replace(
  /description: m.description, \r?\n\s*imagePreview: m.image \|\| '', file: null/g,
  "description: m.description, socialLink: m.socialLink || '', \n        imagePreview: m.image || '', file: null"
);

// Add to save functions
content = content.replace(
  /description: memberForm.description,\r?\n\s*image: memberForm.imagePreview/g,
  "description: memberForm.description,\n      socialLink: memberForm.socialLink,\n      image: memberForm.imagePreview"
);

// Add inputs to modals
const socialLinkInput = `
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Link Sosial Media (Opsional)</label>
                <input type="url" placeholder="https://linkedin.com/..." value={memberForm.socialLink || ''} onChange={e => setMemberForm({...memberForm, socialLink: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-surface" />
              </div>
`;

content = content.replace(
  /<textarea rows=\{2\} value=\{memberForm.description\}.*?><\/textarea>\r?\n\s*<\/div>/g,
  `$&
${socialLinkInput}`
);

fs.writeFileSync(file, content);
console.log('AdminAbout.tsx updated');
