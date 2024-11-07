"use client"
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Card, CardBody, Divider,Button,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";


import React, {  FormEvent,useState,useEffect } from 'react'
interface PatentAnalysis {
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
const Report = ({data} : { data : PatentAnalysis }) => {
    return (
        <>
            {
                data?.analysis_date && (
                    <div className="pt-3 max-w-[800px] w-[100%]">
                        <div className="flex flex-row justify-between items-end ">
                            <div className="flex flex-row">
                                <div className="w-24 flex flex-col">
                                    <span>Patent:</span>
                                    <span>Company:</span>
                                    <span>Date:</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>{data.patent_id}</span>
                                    <span>{data.company_name}</span>
                                    <span>{data.analysis_date}</span>
                                </div>
                            </div>
                            <div className="w-24 flex flex-col">
                                <Button color="primary">Export</Button>
                            </div>
                        </div>
                        <ReportTable products={data.analyze?.top_infringing_products}/>
                        <Assessment assessment={data.analyze?.overall_risk_assessment} />
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
                                    {Object.values(products).map((product, index) => (
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
