const fs = require('fs');
const file = 'c:/Users/gamin/OneDrive/Documents/project web/web/frontend/src/pages/About.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'const [members, setMembers] = useState<any[]>([]);',
  `const [members, setMembers] = useState<any[]>([]);
  const [advisors, setAdvisors] = useState<any[]>([]);`
);

content = content.replace(
  'if (data.members && data.members.length > 0) {',
  `if (data.advisors && data.advisors.length > 0) {
          setAdvisors(data.advisors.map((m: any) => ({
            ...m,
            image: m.image ? (m.image.startsWith('http') ? m.image : \`\${m.image}\`) : ''
          })));
        }
        if (data.members && data.members.length > 0) {`
);

const uiCode = `
      {/* 6. STRUKTUR DEWAN PEMBINA */}
      <section className="py-16 sm:py-20 bg-surface-container-lowest border-t border-border-subtle">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-display font-bold text-secondary tracking-widest uppercase mb-1 block">
              Dewan Pembina
            </span>
            <h2 className="text-3xl font-display font-bold text-primary mb-3">
              Susunan Dewan Pembina
            </h2>
            <div className="w-16 h-1 bg-secondary-container mx-auto rounded-full mb-4"></div>
            <p className="text-on-surface-variant text-base">
              Tokoh-tokoh pengarah yang senantiasa membimbing langkah strategis ikatan alumni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {advisors.length > 0 ? advisors.map((advisor, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl border border-border-subtle overflow-hidden text-center hover-lift p-6 shadow-level1"
              >
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                />
                <span className="px-3 py-1 rounded-full text-xs font-display font-semibold bg-secondary-container text-primary inline-block mb-2">
                  {advisor.role}
                </span>
                <h3 className="font-display font-bold text-primary text-lg mb-1">
                  {advisor.name}
                </h3>
                <p className="text-xs text-outline mb-3 font-semibold">
                  {t('about.board.period')} {advisor.period}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {advisor.description}
                </p>
              </div>
            )) : (
              <p className="text-center col-span-3 text-on-surface-variant">Belum ada data dewan pembina.</p>
            )}
          </div>
        </div>
      </section>
`;

content = content.replace(
  '    </div>\n  );\n};',
  uiCode + '    </div>\n  );\n};'
);

fs.writeFileSync(file, content);
console.log('About.tsx updated successfully');
