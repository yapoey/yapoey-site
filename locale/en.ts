export default defineI18nLocale(async () => {
  return {
    Header: {
      home: "Home",
      services: "Services",
      about: "About",
      resume: "Resume",
      works: "Works",
      contact: "Contact",
      blog: "Blog",
      languages: "lang",
    },
    HeroArea: {
      hey: "HEY! I AM",
      YapoeY: "YapoeY !",
      Iam: "I am a ",
      freelancer: "Freelancer.",
      frontend: "Frontend developer.",
      backend: "Backend developer.",
      motto: "Start with whY and end with Yeah!",
      shortCv: "Resume",
    },
    ServiceArea: {
      services: "MY SERVICES",
      mainTitle: "I can make this awesome things",
      subTitle:
        "I understand the challenges of working remotely. Here are some values I cherish and processes I use to work.",
      firstTitle: "Organization",
      subFirst:
        "It's important to stay organised. I use the likes of Jira & self design Excel sheet to help keep projects on-track and under control.",
      secTitle: "Fast",
      subSec: "Fast load times and lag free interaction, my highest priority.",
      thrTitle: "Responsive",
      subThr: "My layouts will work on any device, big or small.",
      fourthTitle: "Dynamic",
      subFourth:
        "Websites don't have to be static, I love making pages come to life.",
    },
    AboutArea: {
      aboutMe: "About Me",
      summery:
        "Look at me. I am from Egypt, but I call South Korea home. I enjoy creating things that live on the internet. My interest in web development started back in 2011 when I met my first Korean friend during the Arab Spring. So, after university in Egypt, I started a second bachelor's in computer science at Hanyang, one of the top universities in South Korea. Fast-forward to today. I've had the privilege of working at a Korean government office as a web developer, then with a Korean startup. My main focus these days is building accessible, inclusive products and digital experiences for various clients. I also recently launched my YouTube channel that covers everything you need to build a web app in Arabic.",
      name: "Name:",
      dob: "Date of birth:",
      address: "Address:",
      zipCode: "Zip code:",
      downloadCv: "Resume",
      subCv: "Detalied Cv",
    },
    ResumeArea: {
      resume: "Resume",
      Education: "Education",
      Experience: "Experience",
      Skills: "Skills",
      WebDevelop: "Web Developing",
      WebHosting: "Hosting & Management",
      educations: [
        {
          year: "2009-2013",
          degree: "Bachelor in Accounting",
          name: "Ain Shams University",
          des: "",
        },
        {
          year: "2014-2015",
          degree: "Korean Language",
          name: "Kyng hee University",
          des: "",
        },
        {
          year: "2015-2019",
          degree: "Computer Science and Engineering",
          name: "Hanyang University",
          des: "",
        },
      ],
      experiences: [
        {
          title: "Front End Developer",
          employmentType: "Part-time",
          company: "Perfect Quality for Construction",
          country: "Egypt",
          duration: "2012-2013",
          des:
            "• Created the company website www.perfectquality.us (no longer active). \n" +
            "• Visited numerous construction sites taking pictures. \n" +
            "• Every quarter, I designed a layout of quantitative and qualitative reports for workers and equipment. \n" +
            "• Designed the company uniform.\n" +
            "• SNS marketing for company.\n" +
            "• Created a video of the company history using Adobe Premiere.",
        },
        {
          title: "Translator",
          employmentType: "Freelance",
          company: "Platform Story",
          country: "Korea",
          duration: "2015/07-2015/12",
          des:
            "• Helped to create application for Arab people for Halal Food (HalalKorea app).\n" +
            "• Supported the team with creative ideas.\n" +
            "• Explained the Arab cultural background.\n" +
            "• Helped to develop the marketing plan.",
        },
        {
          title: "Design Intern &  Translator",
          employmentType: "Intern",
          company: "Korean Government Gangdong-gu Office",
          country: "Korea",
          duration: "2016/06-2016/09",
          des:
            "• Maintained the English version of the site english.gangdong.go.kr. \n" +
            "• learned about License Plate Recognition (LPR) Parking system. \n" +
            "• Participated in design of the parking lot Korean Government Gangdong-gu Office.",
        },
        {
          title: "Front End Developer & Translator.",
          employmentType: "Freelancer",
          company: "\uC5D1\uC2A4\uCE74\uC988\uBBF9",
          country: "Korea",
          duration: "2015/12-2017/06",
          des:
            "Excosmic, an import and export company, has already opened several online shopping malls; for example, China and Korea. Furthermore, they have a vision to investing in Arab markets. So, I was \n" +
            "• Develop static Arabic version of company Website.(HTML, CSS, Bootstrap, Javascript)\n" +
            "• Investigated Arab markets.\n" +
            "• Investigated the consumer behavior.\n" +
            "• Investigated online shopping mall business in Arab markets.\n" +
            "• Built bridges between Excosmic and Middle East companies.\n" +
            "• Translated from Korean to English / Arabic.",
        },
        {
          title: "Front End & Translator",
          employmentType: "Part-time",
          company: "H&Consulting",
          country: "Korea",
          duration: "2017/01/01-2017/12/01",
          des: "Maintained, updated and translated the site http://arabic.visitmedicalkorea.com/arabic from Korean/English to Arabic.",
        },
        {
          title: "Full Stack Developer",
          employmentType: "Freelancer",
          company: "Bio & Pure for Cosmetic",
          country: "Qatar",
          duration: "2016/05-2018/08",
          des:
            "Designed and developed small cosmetics website bioandpure.com from scratch.\n" +
            "Front end:\n" +
            "(Bootstrap 4, Javascript, HTML5, SASS, Webpack)\n" +
            "Back end\n" +
            "(PHP, laravel framework, Restful API, mySQL for database)",
        },
        {
          title: "Front-end Developer",
          employmentType: "Freelancer",
          company: "Hanyang University Social Innovtio Center",
          country: "Korea",
          duration: "2018/08-2018/12",
          des:
            "• Brainstormed and designed responsive website. \n" +
            "Frontend(HTML, CSS, Bootstrap, jQuery)\n" +
            "• Translated from Korean-English.",
        },
        {
          title: "Full-stack Developer",
          employmentType: "Full-Time",
          company: "GeeksFamily",
          country: "Korea",
          duration: "2019/02-2019/11",
          des:
            "In GeeksFamily we were building delivery sharing system in addition to point of sale (POS). I was responsible for: \n" +
            "• Developing point of sale (POS) page\n" +
            "• Developing orders summary page\n" +
            "• Developing page for adding menus to the system\n" +
            "• Translate UI/UX design wireframes to actual code\n" +
            "• Define how the application looks and how it works\n" +
            "• Validate input before submitting to back end\n" +
            "\n" +
            "Side projects:\n" +
            "• Maintain and develop the main website of the company\n" +
            "• Develop food ordering web app\n" +
            "• Side project for calculating day by day all restaurant orders\n" +
            "\n" +
            "Front-end:\n" +
            "(HTML, SASS, Webpack, Bootstrap, jQuery, Vue js)\n" +
            "\n" +
            "Back-end: \n" +
            "(PHP laravel, mySQL, RESTFUL API)\n" +
            "\n" +
            "Connecting many API\n" +
            "(FaceBook API, Google Analytics API, Payment Company API)\n" +
            "\n" +
            "Using Libraries\n" +
            "(Moments,  Chart.js)\n" +
            "\n" +
            "CI/CD: \n" +
            "(bitbucket, jira, bamboo, slack)",
        },
        {
          title: "Front End Developer",
          employmentType: "Full-time",
          company: "Himedi",
          country: "Korea",
          duration: "2019/12-2021/11",
          des:
            "In Himedi we were building medical platform where we connect Korean hospitals with foreigner patients. I responsible for developing front-end from scratch: \n" +
            "\n" +
            "• Translate UI/UX design wireframes to actual code\n" +
            "• Define how the application looks and how it works\n" +
            "• Bridge the gap between graphic design and technical implementation\n" +
            "• Enhance application for maximum speed and scalability\n" +
            "• Collaborate with back-end developers and web designers to improve usability\n" +
            "• Validate input before submitting to back end\n" +
            "• Ensure cross-browser compatibility\n" +
            "• Implementing multiple languages(English, Arabic, Russian)\n" +
            "\n" +
            "Front-end:\n" +
            "(HTML, SASS, Vue js, vuex, vue router, Bootstrap 4, Webpack, Axios) \n" +
            "\n" +
            "Connecting many API\n" +
            "(Backend API, FaceBook API, Google Analytics API)\n" +
            "\n" +
            "Using Libraries\n" +
            "(I18n, RTLCSS, Google map, Scrollbooster, Swiper, Google analytics)\n" +
            "\n" +
            "CI/CD: \n" +
            "(Notions, Github, G-Suite)",
        },
        {
          title: "Front End Developer",
          employmentType: "Full-time",
          company: "b2ggames",
          country: "Korea",
          duration: "2021/12 Till-Now",
          des:
            "b2ggames is a startup company for creating competitions games. I was responsible for\n" +
            "• Develop from scratch Asian Model Festival (AMF) event website www.amffantasy.com\n" +
            "• Daily maintenance of existed project playerz, debugging issues and solving clients problems.\n" +
            "• Enhance application for maximum speed and scalability\n" +
            "• Collaborate with back-end developers and web designers to improve usability\n" +
            "• Validate input before submitting to back end\n" +
            "• Ensure cross-browser compatibility\n" +
            "• Set documentation system for exited projects using notion\n" +
            "• Set onboarding program for new developers\n" +
            "• Implementing multiple languages(English, Korean)\n" +
            "Front-end:\n" +
            "(HTML, SASS, Nuxt js, vuex)\n" +
            "\n" +
            "Connecting API\n" +
            "(Backend API, FaceBook API, Google Analytics API)\n" +
            "\n" +
            "CI/CD:\n" +
            "(Notion, Bitbuckt, Jira, teams)\n",
        },
      ],
      skills: [],
    },
    WorkArea: {
      myProject: "My Projects",
      projects: [
        {
          name: "Korean Baseball League",
          url: "https://kbl-pc.b2ggames.net",
          img: "kbl.png",
          type: "Frontend",
        },
        {
          name: "Asian Model Festival 2021",
          url: "https://www.amffantasy.com/main",
          img: "amf.png",
          type: "Frontend",
        },
        {
          name: "Galaxy 3D",
          url: "https://s3.eu-west-3.amazonaws.com/yapoey.com/assets/sites/Galaxy/index.html",
          img: "galaxy.png",
          type: "Practicing",
        },
        {
          name: "Himedi",
          url: "https://himedi.com",
          img: "himedi.png",
          type: "Frontend",
        },
        {
          name: "Old YapoeY",
          url: "http://old.yapoey.com",
          img: "oldYapoey.en.png",
          type: "Frontend",
        },
        {
          name: "GeeksFamily POS",
          url: "http://pos.woozza.dunkul.site/",
          img: "pos.woozza.png",
          type: "FullStack",
        },
        {
          name: "GeeksFamily Woozza",
          url: "https://www.woozza.co.kr/",
          img: "woozza.png",
          type: "Frontend",
        },
        {
          name: "Hanyang University Social Innovation Center",
          url: "http://project3.yapoey.com/index_en.html",
          img: "hvc.en.png",
          type: "FullStack",
        },
        {
          name: "HolyHome",
          url: "http://project2.yapoey.com",
          img: "holyHome.png",
          type: "Practicing",
        },
        {
          name: "Seoul Youth University",
          url: "http://gdnetworker.cafe24.com",
          img: "youthUniversity.png",
          type: "Practicing",
        },
        {
          name: "YapoeY Logo 3D",
          url: "https://wbgl-3d-text-snowy.vercel.app/",
          img: "yapoey.jpeg",
          type: "Practicing",
        },
      ],
    },
    ContactArea: {
      contact: "Contact Me",
      enterName: "Enter your name",
      urEmail: "Your email address",
      enterDiscussion: "Enter the discussion title",
      enterMsg: "Write your message",
      sendMsg: "Send message Now",
    },
    Common: {
      download: "Download",
      yapoey: "yapoey",
      vName: "Mohamed Ibrahim",
      vDob: "April 20, 1992",
      vAddress: "Seoul, South Korea",
      vZipcode: "",
      email: "Email:",
      vEmail: "yapoey{'@'}gmail.com",
      phone: "Phone:",
      vPhone: "",
      hireme: "Hire me",
      website: "yapoey.com",
      frontend: "Frontend",
      fullStack: "FullStack",
      practicing: "Practicing",
      sent: "sent",
      follow: "Follow Me",
    },
    doc: {
      pdf: "/assets/resume/YapoeY.en.pdf",
    },
  }
})
