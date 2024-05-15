import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Questions = () => {
    return (
        <div>
            <Accordion type="multi" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is Stuco?</AccordionTrigger>
                    <AccordionContent>
                    Stuco is a simulation of school of schools that is a student management system for multiple schools. Essentially stuco is a school organization that manages schools and data. Stuco provides student-focused platforms that provides access to various tools and features designed to enhance the student experience, including study spaces, productivity tools. Stuco: Admin on the other hand, is a admin-focused platform primarily for student management systems; viewing statistics and managing students
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger>Why Stuco?</AccordionTrigger>
                    <AccordionContent>
                    Stuco aims to streamline the student experience by offering a centralized platform for accessing essential tools and resources. By providing features such as study spaces with integrated tools like timers, calculators, converters, note-taking, and to-do lists, Stuco helps students manage their academic tasks more efficiently (Note: non-students may also sign-up). Additionally, Stuco Admin offers administrators the ability to manage student data, attendance, and access insightful statistics to support school management and decision-making processes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is the platform free? </AccordionTrigger>
                    <AccordionContent>
                        Yes!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Is it used for educational purposes? </AccordionTrigger>
                    <AccordionContent>
                    Yes, Stuco is designed to support students in their educational endeavors by providing access to tools and resources aimed at improving productivity and organization..
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>How secure is Stuco? </AccordionTrigger>
                    <AccordionContent>
                    Stuco takes security and privacy seriously. Measures are in place to protect user data and ensure compliance with relevant privacy regulations. Additionally, Stuco employs encryption and other security protocols to safeguard user information.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default Questions