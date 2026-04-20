let currentTemplate = 'classic';

function openEditor(template) {
    currentTemplate = template;
    var modal = document.getElementById('editorModal');
    if (!modal) return;

    // Mostrar o modal
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'flex-start';
    modal.style.padding = '2rem';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '1000';

    renderCV();
    setupLiveUpdate();

    // Definir botão ativo inicial e indicador
    setTimeout(() => {
        const templateNames = {
            'classic': 'Modelo 1',
            'modern': 'Modelo 2',
            'minimal': 'Modelo 3'
        };

        const infoElement = document.getElementById('currentTemplateInfo');
        if (infoElement) {
            infoElement.textContent = 'Visualizando: ' + templateNames[template];
        }

        const buttons = document.querySelectorAll('.template-buttons .btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        if (template === 'classic') {
            buttons[0].classList.add('active');
        } else if (template === 'modern') {
            buttons[1].classList.add('active');
        } else if (template === 'minimal') {
            buttons[2].classList.add('active');
        }
    }, 100);
}

function closeEditor() {
    var modal = document.getElementById('editorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function getFormData() {
    return {
        nome: document.getElementById('nome').value || 'Seu Nome',
        email: document.getElementById('email').value || 'email@exemplo.com',
        telefone: document.getElementById('telefone').value || '(00) 00000-0000',
        linkedin: document.getElementById('linkedin').value || 'linkedin.com/in/seu-perfil',
        localizacao: document.getElementById('localizacao').value || 'Cidade, UF',
        resumo: document.getElementById('resumo').value || 'Profissional com experiência na área...',
        emp1: {
            nome: document.getElementById('emp1_nome').value || 'Empresa 1',
            cargo: document.getElementById('emp1_cargo').value || 'Cargo',
            periodo: document.getElementById('emp1_periodo').value || '2020 - 2024',
            local: document.getElementById('emp1_local').value || 'Cidade',
            desc: document.getElementById('emp1_desc').value || 'Descrição das atividades...'
        },
        emp2: {
            nome: document.getElementById('emp2_nome').value || 'Empresa 2',
            cargo: document.getElementById('emp2_cargo').value || 'Cargo',
            periodo: document.getElementById('emp2_periodo').value || '2018 - 2020',
            local: document.getElementById('emp2_local').value || 'Cidade',
            desc: document.getElementById('emp2_desc').value || 'Descrição das atividades...'
        },
        form1: document.getElementById('form1').value || 'Universidade - Curso',
        form2: document.getElementById('form2').value || '',
        cursos: document.getElementById('cursos').value || '',
        skills: document.getElementById('skills').value || 'Skill 1, Skill 2',
        idiomas: document.getElementById('idiomas').value || 'Inglês - Avançado'
    };
}

function renderCV() {
    var data = getFormData();
    var cv = document.getElementById('cvOutput');

    if (currentTemplate === 'classic') {
        cv.className = 'cv-page cv-classic';
        cv.innerHTML = renderClassic(data);
    } else if (currentTemplate === 'modern') {
        cv.className = 'cv-page cv-modern';
        cv.innerHTML = renderModern(data);
    } else if (currentTemplate === 'minimal') {
        cv.className = 'cv-page cv-minimal';
        cv.innerHTML = renderMinimal(data);
    }
}

function renderClassic(data) {
    const skills = data.skills.split(',').map(s => s.trim()).filter(s => s);
    const skillTags = skills.map(s => `<span class="cv-skill-tag">${s}</span>`).join('');

    return `
        <div class="cv-header">
            <div class="cv-name">${data.nome}</div>
            <div class="cv-contact">
                <span>${data.email}</span>
                <span>${data.telefone}</span>
                <span>${data.localizacao}</span>
            </div>
            ${data.linkedin ? `<div style="font-size: 0.8rem; margin-top: 0.3rem;">${data.linkedin}</div>` : ''}
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Resumo Profissional</div>
            <div class="cv-item-desc">${data.resumo}</div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Experiência Profissional</div>

            <div class="cv-item">
                <div class="cv-item-title">${data.emp1.cargo} - ${data.emp1.nome}</div>
                <div class="cv-item-sub">${data.emp1.periodo} | ${data.emp1.local}</div>
                <div class="cv-item-desc">${data.emp1.desc}</div>
            </div>

            <div class="cv-item">
                <div class="cv-item-title">${data.emp2.cargo} - ${data.emp2.nome}</div>
                <div class="cv-item-sub">${data.emp2.periodo} | ${data.emp2.local}</div>
                <div class="cv-item-desc">${data.emp2.desc}</div>
            </div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Formação Acadêmica</div>
            <div class="cv-item">
                <div class="cv-item-title">${data.form1}</div>
            </div>
            ${data.form2 ? `<div class="cv-item"><div class="cv-item-title">${data.form2}</div></div>` : ''}
        </div>

        ${data.cursos ? `
        <div class="cv-section">
            <div class="cv-section-title">Cursos e Certificações</div>
            <div class="cv-item-desc" style="white-space: pre-line;">${data.cursos}</div>
        </div>
        ` : ''}

        <div class="cv-section">
            <div class="cv-section-title">Habilidades Técnicas</div>
            <div class="cv-skills">${skillTags}</div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Idiomas</div>
            <div class="cv-item-desc" style="white-space: pre-line;">${data.idiomas}</div>
        </div>
    `;
}

function renderModern(data) {
    const skills = data.skills.split(',').map(s => s.trim()).filter(s => s);
    const skillTags = skills.map(s => `<span class="cv-skill-tag">${s}</span>`).join('');

    return `
        <div class="cv-sidebar">
            <div class="cv-name">${data.nome}</div>
            <div class="cv-title-role">Currículo Profissional</div>

            <div class="cv-sidebar-section">
                <div class="cv-sidebar-title">Contato</div>
                <div class="cv-contact-item">${data.email}</div>
                <div class="cv-contact-item">${data.telefone}</div>
                <div class="cv-contact-item">${data.localizacao}</div>
                ${data.linkedin ? `<div class="cv-contact-item">${data.linkedin}</div>` : ''}
            </div>

            <div class="cv-sidebar-section">
                <div class="cv-sidebar-title">Habilidades</div>
                ${skillTags}
            </div>

            <div class="cv-sidebar-section">
                <div class="cv-sidebar-title">Idiomas</div>
                <div style="font-size: 0.8rem; opacity: 0.9;">${data.idiomas.replace(/\n/g, '<br>')}</div>
            </div>
        </div>

        <div class="cv-main">
            <div class="cv-main-section">
                <div class="cv-main-title">Resumo Profissional</div>
                <div class="cv-item-desc">${data.resumo}</div>
            </div>

            <div class="cv-main-section">
                <div class="cv-main-title">Experiência Profissional</div>

                <div class="cv-item">
                    <div class="cv-item-title">${data.emp1.cargo}</div>
                    <div class="cv-item-sub">${data.emp1.nome} | ${data.emp1.periodo}</div>
                    <div class="cv-item-desc">${data.emp1.desc}</div>
                </div>

                <div class="cv-item">
                    <div class="cv-item-title">${data.emp2.cargo}</div>
                    <div class="cv-item-sub">${data.emp2.nome} | ${data.emp2.periodo}</div>
                    <div class="cv-item-desc">${data.emp2.desc}</div>
                </div>
            </div>

            <div class="cv-main-section">
                <div class="cv-main-title">Formação</div>

                <div class="cv-item">
                    <div class="cv-item-title">${data.form1}</div>
                </div>
                ${data.form2 ? `<div class="cv-item"><div class="cv-item-title">${data.form2}</div></div>` : ''}
            </div>

            ${data.cursos ? `
            <div class="cv-main-section">
                <div class="cv-main-title">Cursos</div>
                <div class="cv-item-desc" style="white-space: pre-line;">${data.cursos}</div>
            </div>
            ` : ''}
        </div>
    `;
}

function renderMinimal(data) {
    const skills = data.skills.split(',').map(s => s.trim()).filter(s => s);

    return `
        <div class="cv-header">
            <div class="cv-name">${data.nome}</div>
            <div class="cv-contact">
                <span>${data.email}</span>
                <span>${data.telefone}</span>
                <span>${data.localizacao}</span>
                <span>${data.linkedin}</span>
            </div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Resumo</div>
            <div class="cv-item-desc">${data.resumo}</div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Experiência</div>

            <div class="cv-item">
                <div class="cv-item-title">${data.emp1.cargo} na ${data.emp1.nome}</div>
                <div class="cv-item-sub">${data.emp1.periodo} · ${data.emp1.local}</div>
                <div class="cv-item-desc">${data.emp1.desc}</div>
            </div>

            <div class="cv-item">
                <div class="cv-item-title">${data.emp2.cargo} na ${data.emp2.nome}</div>
                <div class="cv-item-sub">${data.emp2.periodo} · ${data.emp2.local}</div>
                <div class="cv-item-desc">${data.emp2.desc}</div>
            </div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Formação</div>
            <div class="cv-item">
                <div class="cv-item-title">${data.form1}</div>
            </div>
            ${data.form2 ? `<div class="cv-item"><div class="cv-item-title">${data.form2}</div></div>` : ''}
        </div>

        ${data.cursos ? `
        <div class="cv-section">
            <div class="cv-section-title">Cursos</div>
            <div class="cv-item-desc" style="white-space: pre-line;">${data.cursos}</div>
        </div>
        ` : ''}

        <div class="cv-section">
            <div class="cv-section-title">Skills</div>
            <div class="cv-skills">
                ${skills.map(s => `<span class="cv-skill-tag">${s}</span>`).join('')}
            </div>
        </div>

        <div class="cv-section">
            <div class="cv-section-title">Idiomas</div>
            <div class="cv-item-desc" style="white-space: pre-line;">${data.idiomas}</div>
        </div>
    `;
}

function setupLiveUpdate() {
    const inputs = document.querySelectorAll('#editorModal .editor-sidebar input, #editorModal .editor-sidebar textarea');
    inputs.forEach(input => {
        input.addEventListener('input', renderCV);
    });
}

function switchTemplate(template) {
    currentTemplate = template;
    renderCV();

    // Atualizar indicador de modelo atual
    const templateNames = {
        'classic': 'Modelo 1',
        'modern': 'Modelo 2',
        'minimal': 'Modelo 3'
    };
    const infoElement = document.getElementById('currentTemplateInfo');
    if (infoElement) {
        infoElement.textContent = 'Visualizando: ' + templateNames[template];
    }

    // Atualizar botões ativos
    const buttons = document.querySelectorAll('.template-buttons .btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Adicionar classe active ao botão correspondente
    if (template === 'classic') {
        buttons[0].classList.add('active');
    } else if (template === 'modern') {
        buttons[1].classList.add('active');
    } else if (template === 'minimal') {
        buttons[2].classList.add('active');
    }
}

function generatePDF() {
    console.log('=== GERANDO PDF ===');
    console.log('jsPDF disponível:', typeof jsPDF !== 'undefined');
    console.log('html2canvas disponível:', typeof html2canvas !== 'undefined');
    // Determinar qual template está sendo visualizado atualmente
    const cvElement = document.getElementById('cvOutput');
    let templateToUse = 'classic'; // fallback

    if (cvElement) {
        if (cvElement.classList.contains('cv-modern')) {
            templateToUse = 'modern';
        } else if (cvElement.classList.contains('cv-minimal')) {
            templateToUse = 'minimal';
        }
    }

    console.log('Template que será usado no PDF:', templateToUse);

    // Obter dados do formulário
    const data = getFormData();
    console.log('Dados obtidos:', data);

    // Fallback se bibliotecas não estiverem disponíveis
    if (typeof jsPDF === 'undefined') {
        console.warn('jsPDF não disponível, usando impressão padrão');
        window.print();
        return;
    }

    try {
        // Gerar PDF baseado no template detectado
        generatePDFWithTemplate(data, templateToUse);

    } catch (error) {
        console.error('Erro ao criar PDF:', error);
        alert('Erro ao criar PDF. Tentando impressão padrão...');
        window.print();
    }
}

function generatePDFWithTemplate(data, template) {
    console.log('Gerando PDF com template:', template);

    if (template === 'modern') {
        return generateModernPDF(data);
    } else if (template === 'minimal') {
        return generateMinimalPDF(data);
    } else {
        return generateClassicPDF(data);
    }
}

function generateClassicPDF(data) {
    console.log('Gerando PDF Classic');

    // Criar PDF A4
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 12;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin + 5;

    // Configurar fonte (aproximação da Inter)
    pdf.setFont('helvetica', 'normal');

    // Título/Nome (ajustado para parecer com Inter)
    pdf.setFontSize(15);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(26, 26, 46);
    pdf.text(data.nome || 'Seu Nome', margin, yPosition);
    yPosition += 8;

    // Contato
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [];
    if (data.email) contactInfo.push(data.email);
    if (data.telefone) contactInfo.push(data.telefone);
    if (data.localizacao) contactInfo.push(data.localizacao);
    if (data.linkedin) contactInfo.push(data.linkedin);

    if (contactInfo.length > 0) {
        pdf.text(contactInfo.join(' • '), margin, yPosition);
        yPosition += 4;
    }

    // Linha separadora após cabeçalho
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 4;

    // Continuar com o resto do PDF Classic
    addPDFSections(pdf, data, margin, contentWidth, yPosition, pageWidth);

    // Baixar o PDF
    pdf.save('meu-curriculo.pdf');
    console.log('PDF Classic gerado e baixado com sucesso!');
    alert('PDF gerado com sucesso!\nTemplate usado: Classic\nArquivo baixado: meu-curriculo.pdf\n\n✅ Curriculo ok!');
}

function generateModernPDF(data) {
    console.log('Gerando PDF Modern');

    // Criar PDF A4
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 12;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin + 5;

    // Configurar fonte (aproximação da Inter)
    pdf.setFont('helvetica', 'normal');

    // Cabeçalho Modern - Nome maior e destacado
    pdf.setFontSize(17);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(67, 97, 238); // Azul do template modern
    pdf.text(data.nome || 'Seu Nome', margin, yPosition);
    yPosition += 6;

    // Subtítulo/Título profissional
    pdf.setFontSize(10);
    pdf.setTextColor(26, 26, 46);
    pdf.text('Currículo Profissional', margin, yPosition);
    yPosition += 10;

    // Contato em formato moderno (mais espaçado)
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [];
    if (data.email) contactInfo.push('Email: ' + data.email);
    if (data.telefone) contactInfo.push('Tel: ' + data.telefone);
    if (data.localizacao) contactInfo.push('Local: ' + data.localizacao);
    if (data.linkedin) contactInfo.push('LinkedIn: ' + data.linkedin);

    if (contactInfo.length > 0) {
        contactInfo.forEach(info => {
            pdf.text(info, margin, yPosition);
            yPosition += 4;
        });
        yPosition += 2;
    }

    // Linha separadora azul (como no template modern)
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(67, 97, 238);
    pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 6;

    // Continuar com seções
    addPDFSections(pdf, data, margin, contentWidth, yPosition, pageWidth);

    // Baixar o PDF
    pdf.save('meu-curriculo.pdf');
    console.log('PDF Modern gerado e baixado com sucesso!');
    alert('PDF gerado com sucesso!\nTemplate usado: Modern\nArquivo baixado: meu-curriculo.pdf\n\n✅ Curriculo ok!');
}

function generateMinimalPDF(data) {
    console.log('Gerando PDF Minimal');

    // Criar PDF A4
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 15; // Margens maiores para estilo minimal
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin + 10;

    // Configurar fonte (aproximação da Inter)
    pdf.setFont('helvetica', 'normal');

    // Cabeçalho Minimal - Centrado e clean
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'light'); // Fonte mais leve
    pdf.setTextColor(26, 26, 46);
    const nameWidth = pdf.getTextWidth(data.nome || 'Seu Nome');
    pdf.text(data.nome || 'Seu Nome', (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 12;

    // Contato centralizado
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const contactInfo = [];
    if (data.email) contactInfo.push(data.email);
    if (data.telefone) contactInfo.push(data.telefone);
    if (data.localizacao) contactInfo.push(data.localizacao);
    if (data.linkedin) contactInfo.push(data.linkedin);

    if (contactInfo.length > 0) {
        pdf.text(contactInfo.join(' • '), margin, yPosition);
        yPosition += 10;
    }

    // Linha separadora minimal
    pdf.setLineWidth(0.3);
    pdf.setDrawColor(200, 200, 200); // Cinza claro
    pdf.line(margin, yPosition - 3, pageWidth - margin, yPosition - 3);
    yPosition += 8;

    // Continuar com seções
    addPDFSections(pdf, data, margin, contentWidth, yPosition, pageWidth);

    // Baixar o PDF
    pdf.save('meu-curriculo.pdf');
    console.log('PDF Minimal gerado e baixado com sucesso!');
    alert('PDF gerado com sucesso!\nTemplate usado: Minimal\nArquivo baixado: meu-curriculo.pdf\n\n✅ Curriculo ok!');
}

function addPDFSections(pdf, data, margin, contentWidth, yPosition, pageWidth) {
    // Resumo Profissional
    if (data.resumo && data.resumo !== 'Profissional com experiência na área...') {
        yPosition += 1;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('RESUMO PROFISSIONAL', margin, yPosition);
        yPosition += 6;
        pdf.setTextColor(26, 26, 46);

        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        const resumoLines = pdf.splitTextToSize(data.resumo, contentWidth);
        pdf.text(resumoLines, margin, yPosition);
        yPosition += (resumoLines.length * 4) + 4;

        pdf.setLineWidth(0.2);
        pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
        yPosition += 4;
    }

    // Experiência Profissional
    yPosition += 1;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('EXPERIÊNCIA PROFISSIONAL', margin, yPosition);
    yPosition += 6;
    pdf.setTextColor(26, 26, 46);

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'normal');

    // Experiência 1
    if (data.emp1.cargo && data.emp1.nome) {
        pdf.setFont('helvetica', 'bold');
        pdf.text(data.emp1.cargo + ' - ' + data.emp1.nome, margin, yPosition);
        yPosition += 3;

        pdf.setFont('helvetica', 'italic');
        pdf.text(data.emp1.periodo + ' | ' + (data.emp1.local || ''), margin, yPosition);
        yPosition += 4;

        if (data.emp1.desc) {
            pdf.setFont('helvetica', 'normal');
            const exp1Lines = pdf.splitTextToSize(data.emp1.desc, contentWidth);
            pdf.text(exp1Lines, margin, yPosition);
            yPosition += (exp1Lines.length * 3.5) + 1;
        }
    }

    // Experiência 2
    if (data.emp2.cargo && data.emp2.nome) {
        yPosition += 1;
        pdf.setFont('helvetica', 'bold');
        pdf.text(data.emp2.cargo + ' - ' + data.emp2.nome, margin, yPosition);
        yPosition += 3;

        pdf.setFont('helvetica', 'italic');
        pdf.text(data.emp2.periodo + ' | ' + (data.emp2.local || ''), margin, yPosition);
        yPosition += 4;

        if (data.emp2.desc) {
            pdf.setFont('helvetica', 'normal');
            const exp2Lines = pdf.splitTextToSize(data.emp2.desc, contentWidth);
            pdf.text(exp2Lines, margin, yPosition);
            yPosition += (exp2Lines.length * 3.5) + 1;
        }
    }

    // Linha separadora após experiência
    pdf.setLineWidth(0.2);
    pdf.line(margin, yPosition - 1, pageWidth - margin, yPosition - 1);
    yPosition += 4;

    // Formação Acadêmica
    yPosition += 1;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('FORMAÇÃO ACADÊMICA', margin, yPosition);
    yPosition += 6;
    pdf.setTextColor(26, 26, 46);

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'normal');

    if (data.form1) {
        pdf.text(data.form1, margin, yPosition);
        yPosition += 4;
    }

    if (data.form2) {
        pdf.text(data.form2, margin, yPosition);
        yPosition += 4;
    }

    // Linha separadora se houver mais seções
    if (data.cursos || (data.skills && data.skills !== 'Skill 1, Skill 2') || (data.idiomas && data.idiomas !== 'Inglês - Avançado')) {
        pdf.setLineWidth(0.2);
        pdf.line(margin, yPosition - 1, pageWidth - margin, yPosition - 1);
        yPosition += 4;
    }

    // Cursos e Certificações
    if (data.cursos) {
        yPosition += 1;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('CURSOS E CERTIFICAÇÕES', margin, yPosition);
        yPosition += 6;
        pdf.setTextColor(26, 26, 46);

        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        const cursosLines = pdf.splitTextToSize(data.cursos, contentWidth);
        pdf.text(cursosLines, margin, yPosition);
        yPosition += (cursosLines.length * 3.5) + 2;
    }

    // Habilidades
    if (data.skills && data.skills !== 'Skill 1, Skill 2') {
        yPosition += 1;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('HABILIDADES TÉCNICAS', margin, yPosition);
        yPosition += 6;
        pdf.setTextColor(26, 26, 46);

        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        const skills = data.skills.split(',').map(s => s.trim()).filter(s => s);
        const skillsText = skills.join(' • ');
        const skillsLines = pdf.splitTextToSize(skillsText, contentWidth);
        pdf.text(skillsLines, margin, yPosition);
        yPosition += (skillsLines.length * 4) + 2;
    }

    // Idiomas
    if (data.idiomas && data.idiomas !== 'Inglês - Avançado') {
        yPosition += 1;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('IDIOMAS', margin, yPosition);
        yPosition += 6;
        pdf.setTextColor(26, 26, 46);

        pdf.setFontSize(8.5);
        pdf.setFont('helvetica', 'normal');
        const idiomasLines = pdf.splitTextToSize(data.idiomas, contentWidth);
        pdf.text(idiomasLines, margin, yPosition);
        yPosition += (idiomasLines.length * 3.5) + 2;
    }

    // Linha final elegante
    yPosition += 6;
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(67, 97, 238);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);

    // Marca d'água open source (sutil)
    yPosition += 8;
    pdf.setFontSize(6);
    pdf.setTextColor(150, 150, 150); // Cinza claro, quase invisível
    pdf.setFont('helvetica', 'normal');
    const watermark = 'Gerado por CV-OpenSource - https://eulerbelfort.github.io/cv-builder/';
    const watermarkWidth = pdf.getTextWidth(watermark);
    pdf.text(watermark, (pageWidth - watermarkWidth) / 2, yPosition);
}

// Close modal on outside click
document.getElementById('editorModal').addEventListener('click', function(e) {
    e.stopPropagation();
    if (e.target === this) {
        closeEditor();
    }
});
