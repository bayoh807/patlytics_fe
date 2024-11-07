"use client"

import {Input, Button } from "@nextui-org/react";
import 'react-select-search/style.css'
import debounce from 'lodash.debounce';
import React, {  FormEvent,useState,useEffect } from 'react'

interface InputCardProps {
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const InputCard = ({ handleGetReport} :{handleGetReport : Function} ) => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [query, setQuery] = useState({});
    const  handleSubmit = async( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        await setIsSubmit(true)

        try {
            if (query.hasOwnProperty("company") && query.hasOwnProperty("patent")) {
                const queryString = new URLSearchParams(query).toString();
                await handleGetReport(queryString)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmit(false)
        }
    }

    const handleValue = (val : string,key:string )   => {

        setQuery({ ...query,[key]: val })

    }
    return (
        <>

            <form  className="max-w-[800px] py-4 w-[100%]" onSubmit={handleSubmit}>
                <div className="max-w-[800px] py-4 w-[100%] flex flex-row justify-between items-center">

                        <div className="flex flex-row  w-[80%]">
                            <InputSearch handleValue={handleValue} isSubmit={isSubmit} label="Company name" type="company"/>
                            <InputSearch handleValue={handleValue}  isSubmit={isSubmit}  label="Patent ID" type="patent"/>

                        </div>
                       <div>
                           <Button type="submit" isDisabled={isSubmit}>
                               { isSubmit ? "Loading" : "Submit" }
                           </Button>
                       </div>
                </div>
            </form>
        </>
    );
};

const InputSearch = ({ label, type,isSubmit,handleValue }: { label: string, type: string,isSubmit:boolean, handleValue: Function }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectValue, setSelectValue] = useState("");
    const [query, setQuery] = useState("");
    const errorProps = isInvalid
        ? {
            variant: "bordered",
            isInvalid: true,
            errorMessage: `Please enter a valid ${type}`
        }
        : {};

    const selectOption = (option) => {
        handleValue(option,type)
        setSelectValue(option);
        setQuery(option);
        setIsOpen(false);
        setOptions([]);
        setIsInvalid(false)
    };


    useEffect(() => {
        return () => {
            setIsOpen(false)
            if (!isSubmit ) return
            query == "" && setIsInvalid(true)
        };
    }, [isSubmit]);


    const fetchResults = debounce(async (searchTerm) => {
        if (searchTerm) {
            handleValue(searchTerm,type)
            const response = await fetch(`/api/search?type=${type}&keyword=${searchTerm}`);
            const result = await response.json();
            if (Array.isArray(result) && result.length > 0) {
                setIsOpen(true);
                setOptions(result);
            } else {
                setIsOpen(false);
                setOptions([]);
            }
        }
    }, 300);

    const handleChange = (term) => {
        setQuery(term);
        setSelectValue("");
        fetchResults(term);
    };

    const getDisplayValue = () => {
        return selectValue || query;
    };
    return (
        <>
            <div className="max-w-[400px] w-[100%] mx-3">
                <div className="dropdown">
                    <div className="control">
                        <div className="selected-value">
                            <Input
                                label={label}
                                {...errorProps}
                                type="text"
                                value={getDisplayValue()}
                                // onBlur={ () => setIsOpen(false) }
                                onChange={(e) => {
                                    handleChange(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className={`options ${isOpen ? "open" : ""}`}>
                        {options.map((option, index) => (
                            <div
                                onClick={() => selectOption(option)}
                                className="option"
                                key={`${label}-${index}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InputCard
