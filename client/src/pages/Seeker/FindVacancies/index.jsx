import React, { useEffect, useState } from "react";
import {CiSearch, CiLocationOn} from "react-icons/ci"
import { AiOutlineSearch } from "react-icons/ai";
import { RadioGroup } from "@headlessui/react";
import {BsCheck} from "react-icons/bs";
import {ComboBox} from "../../../components/index"
import VacancyItem from "../ProjectInfo/VacancyItem";
import CustomButton from "../../../components/CustomButton";
import { BagIcon, KeyboardIcon } from "../../../assets/icons";
import { PiBriefcaseLight } from "react-icons/pi";
import VacancyDetail from "./VacancyDetail";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { getAllVacancies } from "../../../redux/slices/vacancies/vacanciesSlices";

function onfilterValueSelected(){}
function changeCheckBox(nextChild, isChecked){
    if(isChecked){
        nextChild.style['backgroundColor'] = '#1967d2';
        nextChild.style['color'] = 'white';
    }
    else{
        nextChild.style['backgroundColor'] = '#FFF';
        nextChild.style['color'] = '#696969';
    }
}



const project = [
    {
        projectId: "1",
        projectName: "Build ứng dụng quản lý sinh viên",
        description: "Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality. Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality. Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality",
        user: {
            userId: "1",
            organizerName: "Udemy Inc.",
        },
        maxParticipants: 4,
        socialLink:[
            {
                socialName: "Facebook",
                socialLink: "https://www.facebook.com/"
            },
            {
                socialName: "Github",
                socialLink: "https://github.com/"
            }
        ],
        starDate: "22:28 29/09/2023",
        duration: "3 months",
        status: "Processing",
        participants:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        favouriteUser:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        vacancies:[
            {
                userId: 1,
                ref:'vacancy'
            }
        ]
    },
    {
        projectId: "1",
        projectName: "Build ứng dụng quản lý sinh viên",
        description: "Without JobHunt i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite… The Mitech team works really hard to ensure high level of quality",
        user: {
            userId: "1",
            organizerName: "Udemy Inc.",
        },
        maxParticipants: 4,
        socialLink:[
            {
                socialName: "Facebook",
                socialLink: "https://www.facebook.com/"
            },
            {
                socialName: "Github",
                socialLink: "https://github.com/"
            }
        ],
        starDate: "22:09 29/09/2023",
        duration: "3 months",
        status: "Processing",
        participants:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        favouriteUser:[
            {
                userId: 1,
                ref:'Seeker'
            }
        ],
        vacancies:[
            {
                userId: 1,
                ref:'vacancy'
            }
        ]
    }
];

// const vacancies = [
//     {
//         vacancyId: 1,
//         vacancyName: "Technical Leader", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas. Be involved in every step of the product design cycle from discovery to developer handoff and user acceptance testing. Work with BAs, product managers and tech teams to lead the Product Design. Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications. Accurately estimate design tickets during planning sessions. Contribute to sketching sessions involving non-designersCreate, iterate and maintain UI deliverables including sketch files, style guides, high fidelity prototypes, micro interaction specifications and pattern libraries. Ensure design choices are data led by identifying assumptions to test each sprint, and work with the analysts in your team to plan moderated usability test sessions. Design pixel perfect responsive UI’s and understand that adopting common interface patterns is better for UX than reinventing the wheel Present your work to the wider business at Show & Tell sessions. ",
//         skillsRequired:[
//             {
//                 skillName: "Manager",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//             {
//                 skillName: "Android",
//                 level: "Basic",
//             },
//             {
//                 skillName: "C++",
//                 level: "Advanced",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 1,
//         location: 'Thành phố Hồ Chí Minh',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
//     {
//         vacancyId: 1,
//         vacancyName: "Software Engineering", 
//         description: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.",
//         skillsRequired:[
//             {
//                 skillName: "Javascript",
//                 level: "Advanced",
//             },
//             {
//                 skillName: "Python",
//                 level: "Medium",
//             },
//             {
//                 skillName: "Bootstrap",
//                 level: "Basic",
//             },
//         ],
//         companyName: 'VNG Inc.',
//         maxRequired: 3,
//         location: 'Thành phố Hà Nội',
//         salary: "$45k-$100k",
//         registant:[
//             {
//                 userId: 1,
//                 firstName: "Le Quang",
//                 surName: 'Nhan',
//                 avatar: 'https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/305117982_819079809468330_6882772732131573332_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=_tz73DXI83kAX8-wZsI&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfCo2vH4GN6Tt7KXpVymIL9tEGH-MCebjb2VZfZjP_w6Xw&oe=651DF1E8'
//             },
//             {
//                 userId: 2,
//                 firstName: "Wade",
//                 surName: 'Warren',
//                 avatar: 'https://superio-nextjs.netlify.app/images/resource/candidate-2.png'
//             }
//         ]
//     },
// ];

function FindVacancies() {

    let [plan, setPlan] = useState('startup')

    const [selected, setSelected] = useState({})
    const dispatch = useDispatch()

    let vacancies = useSelector((state) => state.vacancies.vacancies)

    useEffect(() => {
        dispatch(getAllVacancies())
    }, [])

    useEffect(() => {
        if(vacancies) setSelected(vacancies[0])
    }, [vacancies])

    

    return (<>
      <div className="flex flex-col">
        {/* Search Box */}
        <div className='flex flex-col items-center justify-center mt-10'>
            <form className='flex bg-[#fff] shadow-[0_18px_40px_rgba(25,15,9,0.1)] rounded-lg p-[15px] items-center'>
                {/* search by keywords */}
                <div className="flex">
                    <div className="flex items-center">
                        <CiSearch className="w-7 h-7"/>
                        <input className="py-[14px] ml-3 leading-[30px] pr-5 text-base rounded-lg outline-none" color="dimgray" type="text" name="listing-search" placeholder="Job title, keywords, or company"/>
                    </div>
                </div>
                <div className="w-[1.2px] h-10 bg-[#dedede]"></div>
                <div className="flex pl-3">
                    <div className="flex items-center">
                        <CiLocationOn className="w-7 h-7"/>
                        <input className="py-[14px] ml-3 leading-[30px] pr-5 text-base rounded-lg outline-none bg-white" color="dimgray" type="text" name="listing-search" placeholder="City or postcode"/>
                    </div>
                </div>
                <div className="w-[1.2px] h-10 bg-[#dedede]"></div>
                <div className='flex ml-3'>
                    <PiBriefcaseLight className="w-7 h-7"/>
                    <select className='align-middle bg-no-repeat bg-[length:18px_18px] bg-left pl-2 pr-8 mr-2 outline-none'>
                        <option value="0">VietNam</option>
                        <option value="1">Campuchia</option>
                        <option value="2">ThaiLan</option>
                    </select>  
                </div>                                  
                <CustomButton title={"Find Job"} containerStyles={"w-[160px] ml-[10px] h-[50px] bg-[#3c65f5] py-[15px] justify-center text-[14px] rounded-lg text-[#fff] "}>
                
                </CustomButton>
            </form> 
            <div className="w-40 hidden">
                <ComboBox listItem={[{id: "0", name: "Date posted"},{id: "1", name: "Newest"}, {id: "2", name: "Oldest"}]} filterValueSelected={onfilterValueSelected}/>
            </div>
        </div>
        <div className="">             
            <div className="flex flex-row gap-4 mx-[8%] pt-12">
                {/* List Item Project  */}
                <div className="w-1/2">
                    <div className="flex flex-row items-center justify-between py-2">
                        <div className="text-[15px] text-[dimgray] leading-6 font-[400]">
                            Show <strong>10</strong> projects
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="w-44">
                                <ComboBox listItem={[{id: "0", name: "Sort by (default)"},{id: "1", name: "Newest"}, {id: "2", name: "Oldest"}]} filterValueSelected={onfilterValueSelected}/>
                            </div>
                            <div className="w-44 ml-3">
                                <ComboBox listItem={[{id: "0", name: "All"},{id: "1", name: "10 per page"}, {id: "2", name: "20 per page"}, {id: "3", name: "30 per page"}]} filterValueSelected={onfilterValueSelected}/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        {
                            vacancies?.map((item, index) => {
                                return <div key={index} onClick={() => setSelected(item)}>
                                    <VacancyItem props={item} active={selected ? selected == item ? true : false: false} isAvatar={true}/>
                                </div>                  
                            })
                        }
                    </div>
                </div>

                {/* Login search */}
                <div className="w-1/2 flex flex-col mb-[30px]">
                    <div className="flex sticky top-0 py-4 h-[100vh]">
                        <VacancyDetail props={selected}/>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </>);
}

export default FindVacancies;    