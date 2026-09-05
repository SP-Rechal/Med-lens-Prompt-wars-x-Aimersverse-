const fs = require('fs');

let f4 = fs.readFileSync('src/auth.config.ts', 'utf8');
f4 = f4.replace(/session\.user\.role/g, '(session.user as any).role');
fs.writeFileSync('src/auth.config.ts', f4);

let f5 = fs.readFileSync('src/components/intake/PatientIntakeForm.tsx', 'utf8');
f5 = f5.replace(/value="Male"/g, 'value="male"').replace(/value="Female"/g, 'value="female"').replace(/value="Other"/g, 'value="other"');
fs.writeFileSync('src/components/intake/PatientIntakeForm.tsx', f5);

let f7 = fs.readFileSync('src/components/record/StructuredRecord.tsx', 'utf8');
f7 = f7.replace(/analysisResult\.conflicts\.length/g, 'analysisResult?.conflicts?.length').replace(/analysisResult\.clarifications\.length/g, 'analysisResult?.clarifications?.length');
f7 = f7.replace(/analysisResult\.conflicts/g, 'analysisResult?.conflicts').replace(/analysisResult\.clarifications/g, 'analysisResult?.clarifications');
fs.writeFileSync('src/components/record/StructuredRecord.tsx', f7);

let f8 = fs.readFileSync('src/components/review/ConflictResolver.tsx', 'utf8');
f8 = f8.replace(/source1Value/g, 'value1').replace(/source2Value/g, 'value2');
fs.writeFileSync('src/components/review/ConflictResolver.tsx', f8);

let f10 = fs.readFileSync('src/lib/analysis/comparison.ts', 'utf8');
f10 = f10.replace(/metric: currRes\.testName/g, 'testName: currRes.testName');
f10 = f10.replace(/ReportComparison\[\]/g, 'any[]');
fs.writeFileSync('src/lib/analysis/comparison.ts', f10);
