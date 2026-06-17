import { SlideData, QuizQuestion, GlossaryTerm } from "./types";

export const slidesMs: SlideData[] = [
  {
    id: 1,
    kicker: "SLIDE 01 · PENGENALAN",
    title: "Apabila Gergasi Teknologi Mengambil Alih",
    subtitle: "Kes studi ringkas tentang bagaimana Microsoft memperoleh GitHub — dan apa maksudnya dari sudut struktur syarikat serta pelaporan kewangan.",
    bullets: []
  },
  {
    id: 2,
    kicker: "SLIDE 02 · KONSEP ASAS",
    title: "Siapa Induk, Siapa Subsidiari?",
    subtitle: "Dalam pengambilalihan, satu syarikat menjadi pemilik utama kepada syarikat yang lain.",
    bullets: [
      "Microsoft ialah syarikat induk (parent company) kerana ia memiliki kawalan ke atas GitHub.",
      "GitHub menjadi syarikat subsidiari (subsidiary company) kerana ia kini berada di bawah pemilikan Microsoft.",
      "Mudahnya: Microsoft ialah “bos”, manakala GitHub ialah syarikat di bawah kumpulannya."
    ]
  },
  {
    id: 3,
    kicker: "SLIDE 03 · STATUS ENTITI",
    title: "GitHub Tidak “Hilang”",
    subtitle: "Pengambilalihan tidak semestinya bermaksud syarikat yang dibeli lenyap atau dibubarkan.",
    bullets: [
      "GitHub kekal sebagai entiti undang-undang yang sah (separate legal entity).",
      "Jenama, platform, dan identiti GitHub masih dikekalkan sepenuhnya.",
      "Yang berubah ialah struktur pemilikan, pemegang saham, dan pembuat keputusan tertingginya."
    ]
  },
  {
    id: 4,
    kicker: "SLIDE 04 · OPERASI HARIAN",
    title: "Akaun GitHub Masih Berasingan",
    subtitle: "Walaupun dimiliki Microsoft, GitHub masih menjalankan operasi harian sebagai syarikat yang tersendiri.",
    bullets: [
      "GitHub perlu menyimpan buku akaun dan merekod setiap transaksi harian kewangannya sendiri.",
      "GitHub juga menyediakan Penyata Kedudukan Kewangan (Kunci Kira-Kira) secara berasingan untuk kegunaan dalaman dan pematuhan tempatan."
    ]
  },
  {
    id: 5,
    kicker: "SLIDE 05 · PELAPORAN AWAM",
    title: "Tetapi Microsoft Lapor Secara Disatukan",
    subtitle: "Bagi pelabur luar, prestasi kumpulan perlu dilihat sebagai satu gambaran unit ekonomi besar.",
    bullets: [
      "Microsoft menggabungkan (consolidates) aset, liabiliti, hasil, dan belanja GitHub ke dalam satu laporan kumpulan.",
      "Laporan ini dipanggil Penyata Kedudukan Kewangan Disatukan (Consolidated Financial Statement)."
    ]
  },
  {
    id: 6,
    kicker: "SLIDE 06 · RUMUSAN",
    title: "Satu Pengambilalihan, Dua Cara Melihat",
    subtitle: "Bezakan antara cara GitHub beroperasi setiap hari dan cara Microsoft melaporkan kedudukan kepada pemegang kepentingan global.",
    bullets: [
      "Dari segi operasi: GitHub mengekalkan integriti sistem penyimpan rekod dan kewangan tempatannya.",
      "Dari segi pelaporan korporat: Kumpulan Microsoft mengkonsolidasikan angka untuk memaparkan satu entiti tunggal yang kuat."
    ]
  }
];

export const slidesEn: SlideData[] = [
  {
    id: 1,
    kicker: "SLIDE 01 · INTRODUCTION",
    title: "When Tech Giants Take Over",
    subtitle: "A brief case study of Microsoft's acquisition of GitHub — and what it means for corporate structure and financial reporting.",
    bullets: []
  },
  {
    id: 2,
    kicker: "SLIDE 02 · CORE CONCEPTS",
    title: "Who is Parent, Who is Subsidiary?",
    subtitle: "In an acquisition, one company becomes the primary owner of another.",
    bullets: [
      "Microsoft is the parent company because it holds controlling interest over GitHub.",
      "GitHub is the subsidiary company because it is now owned by Microsoft.",
      "Simply put: Microsoft is the 'boss', while GitHub is a company within its group."
    ]
  },
  {
    id: 3,
    kicker: "SLIDE 03 · ENTITY STATUS",
    title: "GitHub Did Not 'Disappear'",
    subtitle: "An acquisition does not necessarily mean the acquired company gets dissolved or liquidated.",
    bullets: [
      "GitHub remains a separate, valid legal entity.",
      "GitHub's brand, platform, and identity are fully preserved.",
      "What changed is the ownership structure, shareholders, and top-level governing authority."
    ]
  },
  {
    id: 4,
    kicker: "SLIDE 04 · DAILY OPERATIONS",
    title: "GitHub's Accounts Remain Separate",
    subtitle: "Despite being owned by Microsoft, GitHub still runs its daily operations as an independent company.",
    bullets: [
      "GitHub must keep its own books and record each of its daily financial transactions.",
      "GitHub also prepares its own separate Statement of Financial Position (Balance Sheet) for internal and local regulatory compliance."
    ]
  },
  {
    id: 5,
    kicker: "SLIDE 05 · PUBLIC REPORTING",
    title: "But Microsoft Reports on a Consolidated Basis",
    subtitle: "For external investors, the group's performance must be viewed as a single large economic unit.",
    bullets: [
      "Microsoft aggregates (consolidates) GitHub's assets, liabilities, revenues, and expenses into a single group report.",
      "This process produces what is known as the Consolidated Financial Statements."
    ]
  },
  {
    id: 6,
    kicker: "SLIDE 06 · CONCLUSION",
    title: "One Acquisition, Two Ways of Viewing",
    subtitle: "Differentiate between how GitHub operates daily and how Microsoft reports to global stakeholders.",
    bullets: [
      "Operationally: GitHub maintains the integrity of its local records and book-keeping systems.",
      "Corporate Reporting: The Microsoft Group consolidates the numbers to present a single, powerful economic entity."
    ]
  }
];

export const quizQuestionsMs: QuizQuestion[] = [
  {
    id: 1,
    question: "Apakah status Microsoft dalam urus niaga pengambilalihan GitHub?",
    options: ["Subsidiari", "Syarikat Induk (Parent Company)", "Rakan Kongsi Sekutu", "Agensi Pengantara"],
    correctIndex: 1,
    explanation: "Microsoft bertindak sebagai syarikat induk (parent company) kerana ia memegang kawalan dan kepentingan majoriti ke atas GitHub."
  },
  {
    id: 2,
    question: "Adakah GitHub dibubarkan atau terus hilang selepas diambil alih oleh Microsoft?",
    options: [
      "Ya, digabungkan sepenuhnya sehingga tiada jenama GitHub", 
      "Tidak, ia kekal sebagai entiti undang-undang sah yang berasingan", 
      "Ya, namanya diubah kepada MSN Code Hub", 
      "Tidak, tetapi ia digantikan dengan Microsoft Word"
    ],
    correctIndex: 1,
    explanation: "GitHub tidak dibubarkan. Ia kekal sebagai 'separate legal entity' yang sah, mengekalkan jenama, platform, dan operasi biasanya."
  },
  {
    id: 3,
    question: "Mengapakah GitHub perlu terus menyimpan buku akaun harian secara berasingan?",
    options: [
      "Kerana mereka tidak mempercayai sistem pengauditan Microsoft", 
      "Kerana GitHub merupakan entiti perniagaan berasingan dari segi kendalian operasi harian", 
      "Sebab data pengguna GitHub dilarang dipindahkan ke pihak asing", 
      "Untuk menyembunyikan maklumat kerugian syarikat daripada Microsoft"
    ],
    correctIndex: 1,
    explanation: "Sebagai entiti perundangan berasingan, GitHub dikehendaki undang-undang syarikat untuk merekod transaksi kewangan mereka secara tersendiri untuk tujuan operasi dan pematuhan tadbir urus."
  },
  {
    id: 4,
    question: "Apakah nama laporan kewangan yang menggabungkan seluruh angka kewangan Induk dan Subsidiari?",
    options: [
      "Penyata Kunci Kira-Kira Terpilih", 
      "Penyata Kedudukan Kewangan Disatukan (Consolidated)", 
      "Laporan Tunai Runcit Berpusat", 
      "Penyata Aliran Untung Berasingan"
    ],
    correctIndex: 1,
    explanation: "Penyata Kedudukan Kewangan Disatukan (Consolidated Financial Statement) menyatukan maklumat kewangan syarikat induk dan semua anak syarikat bagi memaparkan kedudukan kewangan satu kumpulan ekonomi tunggal."
  },
  {
    id: 5,
    question: "Antara berikut, yang manakah menerangkan kesan gabungan pelaporan kewangan disatukan?",
    options: [
      "Satu campur satu jadi satu unit ekonomi besar (eliminasi urus niaga dalaman)",
      "Setiap syarikat melaporkan mengikut keinginan masing-masing tanpa peraturan",
      "Microsoft tidak boleh mengira aset GitHub dalam pelaporannya",
      "GitHub terpaksa membayar semua baki hutang Microsoft dengan tunai sendiri"
    ],
    correctIndex: 0,
    explanation: "Pengkonsolidasian menggabungkan aset dan liabiliti induk-subsidiari sambil menghapuskan (eliminating) urus niaga antara syarikat (intra-group transactions) bagi mengelakkan pelaporan bertindan."
  }
];

export const quizQuestionsEn: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Microsoft's status in the GitHub acquisition transaction?",
    options: ["Subsidiary", "Parent Company", "Associate Partner", "Intermediary Agent"],
    correctIndex: 1,
    explanation: "Microsoft acts as the parent company because it holds the voting control and majority interest over GitHub."
  },
  {
    id: 2,
    question: "Was GitHub dissolved or did it disappear after being acquired by Microsoft?",
    options: [
      "Yes, completely merged so that no GitHub brand remains", 
      "No, it remains as a separate and valid legal entity", 
      "Yes, its name was changed to MSN Code Hub", 
      "No, but it was replaced by Microsoft Word"
    ],
    correctIndex: 1,
    explanation: "GitHub was not dissolved. It remains a separate legal entity, preserving its own brand name, code platform, and general operations."
  },
  {
    id: 3,
    question: "Why does GitHub need to continue keeping its daily books of accounts separately?",
    options: [
      "Because they do not trust Microsoft's accounting system", 
      "Because GitHub is a separate business entity with its own daily operations", 
      "Because user data is barred from transfer to foreign parties", 
      "To conceal loss information from Microsoft"
    ],
    correctIndex: 1,
    explanation: "As a separate legal entity, GitHub is legally required to record its own financial transactions for operational control and local regulatory compliance."
  },
  {
    id: 4,
    question: "What is the name of the financial report that aggregates the financial numbers of Parent and Subsidiary?",
    options: [
      "Selected Special Balance Sheet", 
      "Consolidated Financial Statements", 
      "Centralized Petty Cash Statement", 
      "Separate Statement of Profit Flows"
    ],
    correctIndex: 1,
    explanation: "The Consolidated Financial Statements aggregate the financial information of the parent and its children to present them as a single, combined economic group."
  },
  {
    id: 5,
    question: "Which of the following describes the key mechanism of consolidated financial reporting?",
    options: [
      "Aggregating parent & subsidiary figures while eliminating intra-group transactions",
      "Each company reporting arbitrarily without standardized accounting rules",
      "Microsoft being banned from showing GitHub's assets on its public statements",
      "GitHub being forced to pay off all Microsoft's debts with its own cash reserves"
    ],
    correctIndex: 0,
    explanation: "Consolidation combines the assets and liabilities of parent and subsidiary, while eliminating intra-group transactions to prevent double-counting."
  }
];

export const glossaryMs: GlossaryTerm[] = [
  {
    term: "Syarikat Induk (Parent Company)",
    definition: "Syarikat yang memiliki atau mengawal kepentingan majoriti (lebih 50% saham undian) dalam syarikat lain.",
    extra: "Contohnya: Microsoft"
  },
  {
    term: "Subsidiari (Subsidiary)",
    definition: "Syarikat anak yang dikawal atau dimiliki oleh Syarikat Induk.",
    extra: "Contohnya: GitHub"
  },
  {
    term: "Entiti Undang-Undang Sah (Separate Legal Entity)",
    definition: "Syarikat dianggap satu status undang-undang yang berasingan daripada pemiliknya (boleh memiliki harta, didakwa atau mendakwa).",
    extra: "Sebab itulah GitHub masih boleh beroperasi di bawah namanya sendiri."
  },
  {
    term: "Penyata Kedudukan Kewangan Disatukan",
    definition: "Penyata kewangan sesebuah kumpulan di mana aset, liabiliti, ekuiti, hasil, perbelanjaan, dan aliran tunai induk dan anak syarikat dibentangkan sebagai satu entiti ekonomi tunggal.",
    extra: "Menghapuskan transaksi antara kumpulan sebelum dilaporkan kepada pelabur awam."
  }
];

export const glossaryEn: GlossaryTerm[] = [
  {
    term: "Parent Company",
    definition: "A company that owns or holds a controlling interest (typically >50% voting shares) in another company.",
    extra: "Example: Microsoft"
  },
  {
    term: "Subsidiary",
    definition: "An offspring company that is controlled or owned by a Parent Company.",
    extra: "Example: GitHub"
  },
  {
    term: "Separate Legal Entity",
    definition: "A company treated by law as separate from its owners (can own property, enter contracts, and sue or be sued).",
    extra: "This explains why GitHub retains its operational name and business agreements."
  },
  {
    term: "Consolidated Financial Statements",
    definition: "Financial reports of a group presented as those of a single economic entity, where assets, liabilities, equity, incomes, and expenses are pooled together.",
    extra: "This removes internal transactions (such as intra-group sales) to give external shareholders a clean view."
  }
];
