"use client"
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Card, CardBody, Divider,Button,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";
import Lodash from 'lodash';

import React, { useState,useEffect } from 'react'
interface PatentAnalysis {
    createdAt?: string
    patent_id: string;
    company_name: string;
    analysis_date: string;
    analyze: {
        overall_risk_assessment: string;
        top_infringing_products?: { [key: string]: InfringingProduct };
    };
}

interface InfringingProduct {
    explanation: string;
    infringement_likelihood: string;
    product_name: string;
    relevant_claims: number[];
    specific_features: string[];
}
const Report = ({data} : { data ?: PatentAnalysis }) => {

    const [localData, setLocalData] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const [showData, setShowData] = useState<PatentAnalysis>(null);

    const getLocalData = () : Array<any>=> {
        let storageData = localStorage.getItem("reports")

        return JSON.parse(storageData)
    }
    const handleClearData = () => {
        localStorage.removeItem("reports")
        setLocalData([])
    }
    const handleSave = () => {

        setIsSaved(true)
        let time = new Date();
        data.createdAt = time.toLocaleString();
        const updatedLocalData = [...localData, data];
        setLocalData(updatedLocalData)
        localStorage.setItem("reports", JSON.stringify(updatedLocalData));
    }

    const handleShowData = (item : PatentAnalysis) => {

        setShowData(item)
    }


    useEffect(() => {
        return () => {
            setIsSaved(false)
            setShowData(data)
        };
    }, [data]);


    useEffect(() => {
        return () => {

            let getData = getLocalData()
            if (Array.isArray(getData) && getData.length > 0) {
                setLocalData(getData)
            }

        };
    }, []);


    return (
        <>
            {
                localData.length > 0 && (
                    <div className="py-3 max-w-[800px] w-[100%]">
                        <DataListModal handleShowData={handleShowData} handleClearData={handleClearData} items={localData} />
                        <Button color={  JSON.stringify(data) === JSON.stringify(showData) ? "default" : "primary"} className="mx-2" onClick={ () => handleShowData(data) }
                        disabled={  JSON.stringify(data) === JSON.stringify(showData)  }>Current Report</Button>
                    </div>
                )
            }

            {
                showData && (
                    <div className="pt-3 max-w-[800px] w-[100%]">


                            <div className="flex flex-row justify-between items-end ">
                                <div className="flex flex-row">
                                    <div className="w-24 flex flex-col">
                                        <span>Patent:</span>
                                        <span>Company:</span>
                                        <span>Date:</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{showData.patent_id}</span>
                                        <span>{showData.company_name}</span>
                                        <span>{showData.analysis_date}</span>
                                    </div>
                                </div>
                                <div className="w-24 flex flex-col">

                                    <Button onClick={handleSave} color={ isSaved ? "default" : "primary"} disabled={isSaved}>{
                                         isSaved ? "Saved" : "Save"
                                    }</Button>


                                </div>
                            </div>
                            <ReportTable products={showData.analyze?.top_infringing_products}/>
                            <Assessment assessment={showData.analyze?.overall_risk_assessment} />

                    </div>
                )

            }
        </>
    )
}
const  ReportTable = ({ products }: { products: { [key: string]: InfringingProduct } | undefined }) => {

    return (
        <>
            {
                products && (
                    <>
                        <Divider className="my-4" />
                        <div classNmae="py-10">
                            <div className="py-6 " >
                                <p classNmae="text-2xl">
                                    Products
                                </p>
                            </div>
                            <Table >
                                <TableHeader>
                                    <TableColumn>Name</TableColumn>
                                    <TableColumn>Likelihood</TableColumn>
                                    <TableColumn>Relevant Claims</TableColumn>

                                    <TableColumn>Features</TableColumn>
                                    <TableColumn>Explanation</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {Object.values(products ?? {}).map((product, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{product.product_name}</TableCell>
                                            <TableCell>{product.infringement_likelihood}</TableCell>
                                            <TableCell>{product.relevant_claims.join(', ')}</TableCell>
                                            <TableCell>
                                                <ul style={{ listStyleType: 'decimal' }}>
                                                    {product.specific_features.map((feature, featureIndex) => (
                                                        <li key={featureIndex}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </TableCell>
                                            <TableCell>
                                                <ExplanationModal name={ product.product_name} content={product.explanation}/>
                                             </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </div>
                    </>

                )
            }
        </>
    );
};
const Assessment = ({ assessment } : {assessment: string|undefined}) => {
    return (
        <>
            { assessment && (<>
                <div className="py-8 " >
                    <p classNmae="text-2xl">
                        Overall Risk Assessment
                    </p>
                </div>
                <Card className="p-4">
                    <CardBody>
                        {assessment}
                    </CardBody>
                </Card>
            </>)}
        </>
    )
}
const DataListModal = ({items,handleShowData,handleClearData} : {items:PatentAnalysis[] ,handleShowData : Function,handleClearData : Function}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    return (
        <>
            <Button color="primary" onPress={onOpen}>Report's Records</Button>
            <Modal
                size="4xl"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Records
                            </ModalHeader>
                            <ModalBody>
                                {
                                    items.map((item,index) => {
                                        return (
                                            <div key={index} className="flex flex-row  justify-between items-center">
                                                <div>
                                                    { item.createdAt }
                                                </div>
                                                <div>
                                                    Patent : { item.patent_id }
                                                </div>
                                                <div>
                                                    Company : { item.company_name }
                                                </div>
                                                <Button color="primary" onClick={() => {
                                                    handleShowData(item)
                                                    onClose()
                                                }}>
                                                    Button
                                                </Button>
                                            </div>
                                        )
                                    })
                                }
                            </ModalBody>
                            <ModalFooter className="flex flex-row justify-between ">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="warning" onPress={ () => {
                                    onClose()
                                    handleClearData()
                                }}>
                                    Clear Records
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
const ExplanationModal = ({name, content} : {name:string, content : string}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <Button color="primary" onPress={onOpen}>Explanation</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {name}
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    { content }
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
export default Report
