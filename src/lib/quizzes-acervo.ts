export type Pergunta = {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export const QUIZZES_POR_LIVRO: Record<string, Record<string, Pergunta[]>> = {
  // 1. Fuga da Biblioteca Do Sr Lemoncello (Chris Grabenstein)
  "bad44537-65d1-4892-8f7a-807037730ac1": {
    medio: [
      {
        pergunta: "Quem é o famoso criador de jogos que construiu a incrível biblioteca da cidade?",
        opcoes: ["Willy Wonka", "Sr. Luigi Lemoncello", "Sherlock Holmes", "Professor Charles Xavier"],
        correta: 1,
        explicacao: "O excêntrico e genial fabricante de jogos de tabuleiro e videogames é o Sr. Luigi Lemoncello.",
      },
      {
        pergunta: "Qual é o nome do protagonista que adora jogos e ganha um convite para a noite de inauguração?",
        opcoes: ["Kyle Keeley", "Charles Chiltington", "Miguel Fernandez", "Harry Potter"],
        correta: 0,
        explicacao: "Kyle Keeley é o garoto apaixonado por jogos que lidera seus amigos no desafio da biblioteca.",
      },
      {
        pergunta: "Qual é o principal desafio proposto pelo Sr. Lemoncello para as crianças?",
        opcoes: [
          "Limpar todas as estantes em menos de uma hora",
          "Escapar da biblioteca usando pistas, livros e enigmas escondidos",
          "Destruir o computador central da biblioteca",
          "Comprar todos os livros da loja",
        ],
        correta: 1,
        explicacao: "O grande jogo é encontrar uma saída secreta da biblioteca desvendando charadas e pistas literárias.",
      },
      {
        pergunta: "Que sistema de classificação de livros é frequentemente utilizado pelos personagens para resolver enigmas?",
        opcoes: ["Código Morse", "Classificação Decimal de Dewey", "Tabela Periódica", "Cifra de César"],
        correta: 1,
        explicacao: "Eles usam o Sistema Decimal de Dewey, fundamental para encontrar livros nas estantes temáticas.",
      },
      {
        pergunta: "Qual valor é mais importante para Kyle e sua equipe vencerem os desafios do jogo?",
        opcoes: ["Trapacear e esconder pistas dos outros", "Trabalho em equipe, leitura e cooperação", "Usar força física contra os rivais", "Desistir na primeira dificuldade"],
        correta: 1,
        explicacao: "A história enfatiza que a colaboração, o respeito mútuo e a paixão pela leitura levam à vitória.",
      },
      {
        pergunta: "Qual mensagem a obra transmite sobre o papel das bibliotecas no mundo moderno?",
        opcoes: [
          "Bibliotecas são lugares mágicos, divertidos e cheios de descobertas",
          "Bibliotecas são lugares chatos onde só se deve fazer silêncio absoluto",
          "Livros físicos não têm mais nenhuma utilidade",
          "Apenas adultos ricos deveriam frequentar bibliotecas",
        ],
        correta: 0,
        explicacao: "O livro mostra que bibliotecas são centros vivos de imaginação, aventura e tecnologia.",
      },
    ],
  },

  // 2. O Mistério do 5 Estrelas (Marcos Rey)
  "9ab8e9e8-b2e8-489a-a3a1-a01e63b7880b": {
    medio: [
      {
        pergunta: "Em qual famoso hotel de São Paulo se passa a trama principal do livro?",
        opcoes: ["Hotel Copacabana", "Hotel Plaza São Paulo", "Hotel Pousada das Estrelas", "Hotel Central"],
        correta: 1,
        explicacao: "A história se desenrola no luxuoso Hotel Plaza São Paulo.",
      },
      {
        pergunta: "Quem é o mensageiro do hotel que descobre um corpo no quarto 222?",
        opcoes: ["Gino", "Leo", "Guima", "Barão"],
        correta: 1,
        explicacao: "Leo é o jovem mensageiro que entra no quarto 222 e vê o cadáver debaixo da cama.",
      },
      {
        pergunta: "Quem são os dois grandes amigos que ajudam Leo a investigar o crime?",
        opcoes: ["Gino e Angela", "Pedrinho e Narizinho", "Bentinho e Capitu", "Tom e Jerry"],
        correta: 0,
        explicacao: "Gino (seu primo que usa cadeira de rodas) e Angela são os fiéis parceiros de investigação de Leo.",
      },
      {
        pergunta: "Por que Leo se envolve em perigo ao tentar provar sua inocência?",
        opcoes: [
          "Porque o corpo desaparece e ninguém acredita no que ele viu",
          "Porque ele confessou o crime por engano",
          "Porque a polícia já havia encerrado o caso",
          "Porque ele perdeu as chaves do hotel",
        ],
        correta: 0,
        explicacao: "Quando o gerente e a polícia vão ao quarto, o corpo sumiu, colocando Leo sob suspeita de mentira ou cumplicidade.",
      },
      {
        pergunta: "Qual é a característica marcante do personagem Gino na história?",
        opcoes: [
          "Ele é um piloto de corrida profissional",
          "Ele é paraplégico, muito inteligente e ajuda a desvendar as pistas com raciocínio lógico",
          "Ele é o verdadeiro vilão do hotel",
          "Ele nunca sai da biblioteca da escola",
        ],
        correta: 1,
        explicacao: "Gino demonstra que a limitação física não impede sua brilhante capacidade dedutiva e coragem.",
      },
      {
        pergunta: "A obra 'O Mistério do 5 Estrelas' faz parte de qual famosa coleção da literatura infantojuvenil brasileira?",
        opcoes: ["Série Vaga-Lume", "Coleção Terra Prometida", "Série Amarela", "Coleção Primeiros Passos"],
        correta: 0,
        explicacao: "O livro é um dos maiores clássicos da lendária Série Vaga-Lume da Editora Ática.",
      },
    ],
  },

  // 3. O Cão dos Baskervilles (Arthur Conan Doyle)
  "7638e7ba-bba5-40da-aa3e-dcb555709087": {
    medio: [
      {
        pergunta: "Qual célebre detetive inglês e seu assistente investigam o mistério da família Baskerville?",
        opcoes: ["Hercule Poirot e Hastings", "Sherlock Holmes e Dr. John Watson", "Auguste Dupin e Leblanc", "Inspetor Clouseau"],
        correta: 1,
        explicacao: "A famosa dupla investigativa criada por Sir Arthur Conan Doyle é Sherlock Holmes e o Dr. Watson.",
      },
      {
        pergunta: "Em qual cenário sombrio e misterioso da Inglaterra se passa a maldição do cão?",
        opcoes: ["Nas florestas tropicais", "Nos pântanos e charnecas de Dartmoor", "Nas praias ensolaradas de Brighton", "Nas montanhas nevadas da Escócia"],
        correta: 1,
        explicacao: "O enredo se passa na desolada e enevoada charneca de Dartmoor (Devonshire).",
      },
      {
        pergunta: "O que a lenda da família Baskerville diz sobre as mortes misteriosas?",
        opcoes: [
          "Que um cão demoníaco espectral persegue os herdeiros da mansão",
          "Que um vampiro habita a torre do castelo",
          "Que alienígenas roubam os animais da fazenda",
          "Que piratas enterraram um tesouro amaldiçoado",
        ],
        correta: 0,
        explicacao: "A lenda diz que uma besta feroz e brilhante vaga pela charneca punindo os herdeiros de Hugo Baskerville.",
      },
      {
        pergunta: "Quem é o herdeiro que vem do Canadá para assumir a propriedade da família?",
        opcoes: ["Sir Charles Baskerville", "Sir Henry Baskerville", "Dr. Mortimer", "Sr. Barrymore"],
        correta: 1,
        explicacao: "Sir Henry Baskerville chega do exterior para assumir a herança deixada por Sir Charles.",
      },
      {
        pergunta: "Como o 'cão espectral' brilhava na escuridão para aterrorizar as vítimas?",
        opcoes: [
          "Com lâmpadas LED azuis",
          "O vilão pintou o pelo do animal com uma preparação de fósforo luminescente",
          "Por causa de radiação nuclear",
          "Era pura ilusão de espelhos",
        ],
        correta: 1,
        explicacao: "Holmes descobre que o animal real foi pintado com uma substância fosforescente para parecer sobrenatural.",
      },
      {
        pergunta: "Qual método Sherlock Holmes utiliza para desvendar todos os seus casos?",
        opcoes: [
          "Leitura de cartas de tarô e adivinhação",
          "Observação rigorosa dos fatos e raciocínio lógico dedutivo",
          "Sorte e palpites aleatórios",
          "Força bruta nos interrogatórios",
        ],
        correta: 1,
        explicacao: "Holmes é o mestre da dedução lógica e observação científica de pistas materiais.",
      },
    ],
  },

  // 4. 70 Historinhas (Carlos Drummond de Andrade)
  "93d3dcdf-c7dd-41b3-851c-9225fc5db1bc": {
    medio: [
      {
        pergunta: "Quem é o autor brasileiro de '70 Historinhas', um dos maiores poetas do nosso país?",
        opcoes: ["Machado de Assis", "Carlos Drummond de Andrade", "Vinicius de Moraes", "Clarice Lispector"],
        correta: 1,
        explicacao: "O livro foi escrito pelo consagrado escritor mineiro Carlos Drummond de Andrade.",
      },
      {
        pergunta: "Qual gênero literário predomina nas '70 Historinhas' de Drummond?",
        opcoes: ["Crônicas e contos curtos do cotidiano", "Tratado científico de botânica", "Peça teatral em versos épicos", "Manual de história antiga"],
        correta: 0,
        explicacao: "O livro reúne 'cronicontos' - textos ágeis e sensíveis inspirados nas pequenas cenas do cotidiano.",
      },
      {
        pergunta: "Como o autor retrata as crianças e os jovens nas histórias deste livro?",
        opcoes: [
          "Como seres bobos sem capacidade de pensar",
          "Com respeito, inteligência, imaginação e senso crítico diante da vida",
          "Como personagens invisíveis sem fala",
          "Sempre como vilões egoístas",
        ],
        correta: 1,
        explicacao: "Drummond não infantiliza os jovens; mostra crianças observadoras, questionadoras e cheias de imaginação.",
      },
      {
        pergunta: "Qual tom ou estilo marca as narrativas de Carlos Drummond de Andrade nesta obra?",
        opcoes: [
          "Terror sangrento e violência",
          "Lirismo, humor sutil, ironia amigável e observação humana",
          "Linguagem excessivamente rebuscada e difícil",
          "Ficção científica com robôs do futuro",
        ],
        correta: 1,
        explicacao: "As historinhas combinam poesia, carinho pelas pessoas simples e um humor suave e reflexivo.",
      },
      {
        pergunta: "O que '70 Historinhas' desperta no leitor sobre os momentos comuns do dia a dia?",
        opcoes: [
          "Que a rotina deve ser desprezada",
          "Que nos detalhes cotidianos e na convivência familiar mora a verdadeira poesia da vida",
          "Que só acontecimentos grandiosos merecem ser contados",
          "Que as pessoas não têm sentimentos",
        ],
        correta: 1,
        explicacao: "O autor ensina a olhar para as pequenas coisas da vida com encanto e sensibilidade.",
      },
      {
        pergunta: "Carlos Drummond de Andrade nasceu em qual estado brasileiro?",
        opcoes: ["Bahia", "Minas Gerais (Itabira)", "Rio de Janeiro", "São Paulo"],
        correta: 1,
        explicacao: "Drummond nasceu em Itabira, Minas Gerais, tema que marcou profundamente toda a sua literatura.",
      },
    ],
  },

  // 5. A história do amor de Fernando e Isaura (Ariano Suassuna)
  "a44c3c0c-b18d-4dd3-9ad1-9bb178971b7c": {
    medio: [
      {
        pergunta: "Quem escreveu a obra 'A História do Amor de Fernando e Isaura'?",
        opcoes: ["Guimarães Rosa", "Ariano Suassuna", "Jorge Amado", "Graciliano Ramos"],
        correta: 1,
        explicacao: "A obra é do grande mestre da cultura nordestina Ariano Suassuna.",
      },
      {
        pergunta: "Esta história de Suassuna é uma recriação nordestina de qual lenda clássica universal?",
        opcoes: ["Romeu e Julieta", "Tristão e Isolda", "Dom Quixote", "O Fantasma da Ópera"],
        correta: 1,
        explicacao: "Suassuna transpôs o mítico romance medieval de Tristão e Isolda para o sertão e agreste nordestino.",
      },
      {
        pergunta: "Qual é o principal obstáculo que marca a paixão proibida entre Fernando e Isaura?",
        opcoes: [
          "A lealdade de Fernando ao tio e marido de Isaura e as disputas de honra das famílias",
          "Eles moravam em planetas diferentes",
          "Nenhum deles sabia falar a mesma língua",
          "Eles não gostavam de poesia",
        ],
        correta: 0,
        explicacao: "O drama envolve o conflito de honra, dever e o amor avassalador que desafia as regras sociais.",
      },
      {
        pergunta: "Qual movimento artístico e literário fundado por Ariano Suassuna valorizou a cultura popular nordestina?",
        opcoes: ["Movimento Armorial", "Modernismo da Semana de 22", "Tropicalismo", "Romantismo Indianista"],
        correta: 0,
        explicacao: "Suassuna foi o criador do Movimento Armorial, unindo o erudito às raízes do folclore e cordel nordestino.",
      },
      {
        pergunta: "Qual é o cenário geográfico e cultural característico onde se passam as obras de Suassuna?",
        opcoes: ["O Sertão e o Nordeste brasileiro com seus costumes e cantigas", "As montanhas nevadas da Suíça", "A selva amazônica isolada", "O centro financeiro de Nova York"],
        correta: 0,
        explicacao: "O sertão nordestino, a caatinga e a rica tradição do povo sertanejo são a marca de Suassuna.",
      },
      {
        pergunta: "O que a trágica história de amor de Fernando e Isaura ensina sobre os sentimentos humanos?",
        opcoes: [
          "Que a paixão verdadeira e a fidelidade aos sentimentos transcendem as imposições e o próprio tempo",
          "Que amar não tem nenhuma importância",
          "Que a ambição material é a única coisa que vale a pena",
          "Que histórias antigas não emocionam os jovens",
        ],
        correta: 0,
        explicacao: "A narrativa retrata a força indomável do amor diante dos dilemas morais e do destino.",
      },
    ],
  },

  // 6. Dez Dias no Manicômio (Nellie Bly)
  "77f94b78-a5d8-4d08-bf81-af47ce400ccc": {
    medio: [
      {
        pergunta: "Quem foi Nellie Bly, a pioneira autora desta marcante reportagem investigativa?",
        opcoes: ["Uma princesa europeia", "Uma corajosa jornalista investigativa norte-americana", "Uma médica psiquiatra", "Uma atriz de cinema mudo"],
        correta: 1,
        explicacao: "Nellie Bly foi a pioneira do jornalismo investigativo disfarçado (infiltrado).",
      },
      {
        pergunta: "O que Nellie Bly fez para conseguir entrar no asilo de mulheres da Ilha Blackwell?",
        opcoes: [
          "Fingiu estar com problemas mentais e perda de memória para ser internada",
          "Comprou o prédio do hospital",
          "Entrou disfarçada de enfermeira chefe",
          "Trabalhou na cozinha por dez anos",
        ],
        correta: 0,
        explicacao: "Ela fingiu insanidade e amnésia diante de juízes e médicos para vivenciar a realidade de dentro.",
      },
      {
        pergunta: "Qual foi o principal objetivo da missão jornalística de Nellie Bly?",
        opcoes: [
          "Denunciar os maus-tratos, o descaso e as condições desumanas a que as mulheres eram submetidas",
          "Passar férias em uma ilha isolada",
          "Aprender a cozinhar para grandes públicos",
          "Escrever um livro de piadas médicas",
        ],
        correta: 0,
        explicacao: "Ela queria expor à opinião pública as atrocidades, negligências e violência contra pacientes internadas.",
      },
      {
        pergunta: "O que aconteceu na sociedade após a publicação da série de reportagens de Nellie Bly no jornal?",
        opcoes: [
          "O jornal foi fechado imediatamente",
          "Houve grande clamor público, investigação judicial e aumento no orçamento para reformar as instituições",
          "Ninguém leu a matéria",
          "As mulheres do asilo foram expulsas",
        ],
        correta: 1,
        explicacao: "A denúncia provocou um grande júri, reformas profundas nas leis e mais verbas para saúde mental.",
      },
      {
        pergunta: "Muitas das mulheres internadas que Nellie Bly conheceu no local eram na verdade:",
        opcoes: [
          "Cientistas premiadas",
          "Mulheres sãs, imigrantes pobres que não falavam inglês ou que foram abandonadas pelas famílias",
          "Soldados de infantaria",
          "Espiãs de outros países",
        ],
        correta: 1,
        explicacao: "Muitas pacientes não tinham nenhum distúrbio; eram apenas imigrantes que não conseguiam se comunicar ou sem recursos.",
      },
      {
        pergunta: "Qual é a grande lição de cidadania e ética que a coragem de Nellie Bly deixa para o mundo?",
        opcoes: [
          "A importância da verdade, da defesa dos direitos humanos e do jornalismo a serviço da justiça",
          "Que devemos aceitar abusos sem reclamar",
          "Que as leis nunca precisam ser aprimoradas",
          "Que a imprensa não deve questionar as autoridades",
        ],
        correta: 0,
        explicacao: "Nellie Bly provou que uma pessoa com determinação pode transformar a sociedade e defender os mais vulneráveis.",
      },
    ],
  },

  // 7. Natureza em alerta (Meio Ambiente / Sustentabilidade)
  "f21cf19d-7d0e-4e09-a959-9165e0b0c7a4": {
    medio: [
      {
        pergunta: "Qual é o tema principal abordado na obra 'Natureza em Alerta'?",
        opcoes: [
          "A preservação do meio ambiente, biodiversidade e o combate à destruição ecológica",
          "Como construir arranha-céus nas cidades",
          "História das moedas antigas",
          "Regras de trânsito em rodovias",
        ],
        correta: 0,
        explicacao: "O livro conscientiza jovens sobre a proteção dos ecossistemas, rios, florestas e animais.",
      },
      {
        pergunta: "Qual é uma das maiores ameaças aos ecossistemas abordadas no livro?",
        opcoes: [
          "O desmatamento desenfreado, queimadas e a poluição das águas",
          "O plantio excessivo de árvores nativas",
          "A criação de reservas ambientais protegidas",
          "O uso de energia solar limpa",
        ],
        correta: 0,
        explicacao: "A degradação ambiental causada por queimadas, desmatamento e poluição coloca os biomas em risco.",
      },
      {
        pergunta: "De acordo com as discussões ambientais da obra, quem é responsável pelo futuro do planeta?",
        opcoes: [
          "Apenas os cientistas em laboratórios",
          "Toda a sociedade: governos, escolas, cidadãos e cada um de nós no cotidiano",
          "Ninguém, pois a natureza se recupera sozinha sem problemas",
          "Apenas quem mora na zona rural",
        ],
        correta: 1,
        explicacao: "A sustentabilidade exige ações coletivas e consciência de cada indivíduo.",
      },
      {
        pergunta: "O que a perda de biodiversidade pode provocar no equilíbrio da Terra?",
        opcoes: [
          "Extinção de espécies animais, desequilíbrio na cadeia alimentar e escassez de recursos vitais",
          "Melhora no clima global",
          "Aumento imediato da água potável",
          "Crescimento saudável de florestas",
        ],
        correta: 0,
        explicacao: "Quando espécies e habitats desaparecem, todo o ciclo hídrico e alimentar é ameaçado.",
      },
      {
        pergunta: "Qual atitude sustentável qualquer estudante pode praticar na escola e em casa?",
        opcoes: [
          "Desperdiçar água na hora do banho e torneiras abertas",
          "Reduzir o consumo, reciclar materiais e economizar água e energia",
          "Jogar embalagens plásticas no chão",
          "Queimar lixo nos quintais",
        ],
        correta: 1,
        explicacao: "Pequenos hábitos conscientes como separar recicláveis e poupar recursos fazem enorme diferença.",
      },
      {
        pergunta: "Qual é a mensagem de esperança que 'Natureza em Alerta' transmite às futuras gerações?",
        opcoes: [
          "Que com conhecimento, respeito à natureza e ações conjuntas podemos regenerar o planeta",
          "Que é tarde demais para fazer qualquer coisa",
          "Que a preservação não traz nenhum benefício",
          "Que as florestas não têm valor para a vida humana",
        ],
        correta: 0,
        explicacao: "O livro motiva a juventude a ser protagonista da transformação e do cuidado com a Terra.",
      },
    ],
  },

  // 8. NANOOK Ele Está Chegando (Gustavo Bernardo / Bianca Soussa)
  "5c4fc796-9863-4bfe-ae50-e59a1673d4fe": {
    medio: [
      {
        pergunta: "Quem é Nanook na narrativa e o que sua figura evoca na imaginação?",
        opcoes: [
          "Uma figura imponente associada ao urso polar e aos mistérios do frio e da natureza",
          "Um pequeno robô doméstico de brinquedo",
          "Um papagaio tagarela da Amazônia",
          "Um carro de corrida veloz",
        ],
        correta: 0,
        explicacao: "Nanook faz referência ao mítico urso branco, guardião do gelo na tradição inuíte e símbolo da natureza selvagem.",
      },
      {
        pergunta: "Qual clima e atmosfera permeiam a trama de 'NANOOK Ele Está Chegando'?",
        opcoes: [
          "Suspense, expectativa e reflexão sobre a aproximação de forças transformadoras",
          "Uma comédia romântica de praia",
          "Um documentário sobre computadores",
          "Uma receita de bolo passo a passo",
        ],
        correta: 0,
        explicacao: "A história constrói um suspense envolvente em torno do anúncio e da chegada do personagem.",
      },
      {
        pergunta: "Como os personagens reagem diante da notícia de que 'Ele está chegando'?",
        opcoes: [
          "Com misto de receio, curiosidade e necessidade de se posicionarem diante do novo",
          "Todos vão dormir e não se importam",
          "Comememoram com um carnaval sem pensar",
          "Vendem suas casas imediatamente",
        ],
        correta: 0,
        explicacao: "A iminente chegada desperta sentimentos de inquietação, união e autodescoberta entre os personagens.",
      },
      {
        pergunta: "O autor Gustavo Bernardo é reconhecido na literatura por explorar quais elementos?",
        opcoes: [
          "A inteligência das metáforas, o mistério e a reflexão sobre medos humanos",
          "Apenas manuais técnicos de química",
          "Crônicas esportivas de futebol",
          "Tabelas estatísticas de comércio",
        ],
        correta: 0,
        explicacao: "Gustavo Bernardo utiliza narrativas intrigantes para fazer o leitor pensar sobre a coragem e as relações humanas.",
      },
      {
        pergunta: "O que a chegada de Nanook simboliza para os envolvidos na história?",
        opcoes: [
          "O confronto com o desconhecido e a oportunidade de amadurecimento",
          "Apenas um dia comum sem novidades",
          "O fim de todas as amizades",
          "Uma competição de videogames",
        ],
        correta: 0,
        explicacao: "A figura misteriosa atua como metáfora para as mudanças profundas que desafiam as pessoas a crescerem.",
      },
      {
        pergunta: "Qual lição o leitor pode tirar ao acompanhar o desfecho da obra?",
        opcoes: [
          "Que o medo do desconhecido se dissipa quando encontramos nossa força interior e união",
          "Que devemos fugir sempre que algo novo surgir",
          "Que a solidão é a melhor resposta para os problemas",
          "Que não devemos confiar em amigos",
        ],
        correta: 0,
        explicacao: "A narrativa mostra que encarar os próprios temores com solidariedade transforma os indivíduos.",
      },
    ],
  },

  // 9. O Bosque das Ilusões Perdidas (Alain-Fournier)
  "3d533f62-9dc5-4a87-bc6e-1b15c0c45ac6": {
    medio: [
      {
        pergunta: "Qual é o título original francês desta famosa obra-prima de Alain-Fournier?",
        opcoes: ["Le Grand Meaulnes", "Les Misérables", "Le Petit Prince", "Madame Bovary"],
        correta: 0,
        explicacao: "O clássico é mundialmente famoso como 'Le Grand Meaulnes', publicado em 1913.",
      },
      {
        pergunta: "Quem é o jovem misterioso e carismático que chega à escola da aldeia e muda a rotina dos alunos?",
        opcoes: ["Augustin Meaulnes", "François Seurel", "Frantz de Galais", "Dr. Watson"],
        correta: 0,
        explicacao: "Augustin Meaulnes (o 'Grande Meaulnes') é o rapaz corajoso e fascinante que chega à escola de Sainte-Agathe.",
      },
      {
        pergunta: "Quem é o narrador sensível da história, filho dos professores da escola?",
        opcoes: ["François Seurel", "Yvonne de Galais", "Ganache", "Julien Sorel"],
        correta: 0,
        explicacao: "François Seurel é o amigo leal de Meaulnes que narra com lirismo e ternura toda a aventura.",
      },
      {
        pergunta: "O que Meaulnes descobre ao se perder na floresta durante o inverno?",
        opcoes: [
          "Uma festa de casamento mágica em um solar antigo com crianças fantasiadas",
          "Uma caverna com ouro de piratas",
          "Uma cidade industrial poluída",
          "Um quartel militar abandonado",
        ],
        correta: 0,
        explicacao: "Ele entra num domínio misterioso e feérico onde ocorre uma festa de casamento e se apaixona por Yvonne de Galais.",
      },
      {
        pergunta: "Qual é o grande tema nostálgico que atravessa toda a obra de Alain-Fournier?",
        opcoes: [
          "A busca pelo paraíso perdido da infância, a pureza dos primeiros amores e a melancolia do crescer",
          "A expansão marítima do século XVI",
          "As finanças bancárias de Paris",
          "A caça a animais selvagens na África",
        ],
        correta: 0,
        explicacao: "O livro é a maior celebração da passagem da adolescência para a vida adulta e dos sonhos juvenis.",
      },
      {
        pergunta: "Qual sentimento a amizade entre Meaulnes e François Seurel expressa com beleza?",
        opcoes: [
          "A lealdade inabalável, a cumplicidade e a generosidade entre verdadeiros amigos",
          "A inveja e o rancor constante",
          "A indiferença diante da dor alheia",
          "A disputa pelo dinheiro da família",
        ],
        correta: 0,
        explicacao: "François dedica sua lealdade a ajudar o amigo em sua busca pelo ideal de amor e felicidade.",
      },
    ],
  },

  // 10. Se Eu Não Te Amasse Tanto Assim (Paulo Sérgio Vale / Literatura Infantojuvenil)
  "52013781-9368-449b-9208-45c31e6e8dbc": {
    medio: [
      {
        pergunta: "Qual é o tema emotivo central da obra 'Se Eu Não Te Amasse Tanto Assim'?",
        opcoes: [
          "Os laços de afeto, a sensibilidade dos sentimentos juvenis e as descobertas do amor",
          "Como pilotar aviões a jato",
          "Estratégias de investimento em bolsa",
          "Técnicas de mineração no deserto",
        ],
        correta: 0,
        explicacao: "A obra investiga a intensidade das primeiras paixões, os desencontros e a beleza do afeto.",
      },
      {
        pergunta: "Como a narrativa dialoga com os sentimentos do leitor adolescente?",
        opcoes: [
          "Através de diálogos sinceros, dúvidas reais sobre a convivência e reflexão sobre a autoimagem",
          "Com fórmulas matemáticas complexas",
          "Ignorando completamente os sentimentos dos jovens",
          "Focando apenas em batalhas medievais",
        ],
        correta: 0,
        explicacao: "O livro reflete com autenticidade as incertezas e emoções que todo jovem vivencia ao se apaixonar.",
      },
      {
        pergunta: "Por que a comunicação e a empatia são tão destacadas entre os personagens?",
        opcoes: [
          "Porque expressar o que se sente evita mal-entendidos e fortalece os vínculos de amizade",
          "Porque os personagens queriam apenas brigar",
          "Porque eles foram proibidos de conversar",
          "Porque não havia telefone na cidade",
        ],
        correta: 0,
        explicacao: "A história mostra que conversar abertamente com respeito e carinho resolve os conflitos do coração.",
      },
      {
        pergunta: "Qual é o papel da família e dos amigos mais próximos durante as turbulências emocionais?",
        opcoes: [
          "Oferecer acolhimento, escuta atenta e apoio nos momentos de incerteza",
          "Julgar e punir qualquer manifestação de sentimento",
          "Fingir que nada está acontecendo",
          "Afastar-se e romper laços",
        ],
        correta: 0,
        explicacao: "O apoio fraterno e o carinho familiar são portos seguros fundamentais para os jovens.",
      },
      {
        pergunta: "Qual transformação positiva os personagens experimentam ao longo do enredo?",
        opcoes: [
          "O amadurecimento emocional e o aprendizado sobre o respeito aos sentimentos do outro",
          "Eles se tornam pessoas frias e egoístas",
          "Eles desistem de todos os seus sonhos",
          "Eles decidem nunca mais ler nenhum livro",
        ],
        correta: 0,
        explicacao: "As vivências e os desafios afetivos conduzem ao amadurecimento e à valorização do amor próprio e do outro.",
      },
      {
        pergunta: "O que a leitura desta obra inspira aos alunos da escola?",
        opcoes: [
          "Desenvolver a inteligência emocional, a empatia e a valorização das pessoas queridas",
          "Guardar sentimentos ruins e nunca desabafar",
          "Achar que o amor é fraqueza",
          "Abandonar os estudos por motivos banais",
        ],
        correta: 0,
        explicacao: "Incentiva a reflexão sobre relações saudáveis, carinho e respeito mútuo.",
      },
    ],
  },

  // 11. Urupês (Monteiro Lobato)
  "7c92e6e2-505b-4e33-809d-1c11987e9386": {
    medio: [
      {
        pergunta: "Quem é o famoso autor brasileiro que escreveu a coletânea de contos 'Urupês'?",
        opcoes: ["Monteiro Lobato", "José de Alencar", "Olavo Bilac", "Euclides da Cunha"],
        correta: 0,
        explicacao: "Monteiro Lobato lançou 'Urupês' em 1918, um dos maiores marcos da prosa regionalista brasileira.",
      },
      {
        pergunta: "Qual personagem emblemático e controverso do caboclo do interior paulista foi criado por Lobato nesta obra?",
        opcoes: ["Jeca Tatu", "Pedrinho", "Visconde de Sabugosa", "Saci-Pererê"],
        correta: 0,
        explicacao: "Jeca Tatu é o célebre personagem que simbolizava o homem esquecido do sertão e do campo.",
      },
      {
        pergunta: "Qual crítica social profunda Monteiro Lobato fez posteriormente sobre a condição do Jeca Tatu?",
        opcoes: [
          "Ele não era preguiçoso por natureza, ele estava doente e abandonado pelas políticas de saneamento e saúde pública",
          "Ele era o homem mais rico do país",
          "Ele vivia em um castelo luxuoso",
          "Ele nunca precisou de ajuda médica",
        ],
        correta: 0,
        explicacao: "A célebre frase 'O Jeca não é assim; ele está assim' chamou a atenção para o combate às verminoses e à falta de médicos no campo.",
      },
      {
        pergunta: "Qual é o significado da palavra 'Urupês' que dá título ao livro?",
        opcoes: [
          "Espécie de fungo / cogumelo que nasce em troncos apodrecidos",
          "Um tipo de pássaro veloz",
          "O nome de uma montanha sagrada",
          "Um peixe de rio",
        ],
        correta: 0,
        explicacao: "Urupê é um fungo parasita que cresce em árvores caídas, usado como metáfora pelo autor para o abandono do interiorano.",
      },
      {
        pergunta: "Além de criar personagens memoráveis, qual grande impacto as obras de Lobato tiveram na saúde brasileira?",
        opcoes: [
          "Incentivaram campanhas nacionais de saneamento básico e erradicação de doenças endêmicas",
          "Eliminaram todas as farmácias do país",
          "Proibiram a vacinação pública",
          "Fizeram as pessoas pararem de ir a hospitais",
        ],
        correta: 0,
        explicacao: "Lobato liderou uma ampla campanha em jornais pelo saneamento do Brasil e criação do Ministério da Saúde.",
      },
      {
        pergunta: "Qual é a importância de estudar 'Urupês' nas escolas hoje?",
        opcoes: [
          "Compreender a evolução social do Brasil, a realidade rural e a força da literatura crítica",
          "Apenas para decorar datas históricas",
          "Achar que nada no país mudou desde 1918",
          "Incentivar o preconceito contra o trabalhador do campo",
        ],
        correta: 0,
        explicacao: "O livro permite discutir história, saúde pública, cidadania e a representação do povo brasileiro.",
      },
    ],
  },
};
