"use client"
import {Image} from "@nextui-org/image";
import InputCard from "@/components/InputCard"
import Report from "@/components/ReportTable";
import React, {  useState } from 'react'
import {Spinner} from "@nextui-org/react";
import Logo from "@/public/Logo.webp"
export default function Index() {
    const [report, setReport] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleGetReport = async (queryString : string) => {
        setIsSubmit(true)
        setReport({})
        const response = await fetch(`/api/report?${queryString}`);
        const result = await response.json();
        await setReport(result)
        await setIsSubmit(false)
    }
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Image  className=" max-h-[150px]" src={Logo.src}/>
        <InputCard  handleGetReport={handleGetReport}/>
        {
            isSubmit && ( <Spinner size="xl" />)
        }
        {
            report && ( <Report data={report}/>)
        }
    </section>
  );
}
