'use client';
import { suggestion } from "@/app/[locale]/data/suggestion";
import { Link } from '@/i18n/routing';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Suggestions from "./suggestions";
import { useTranslations } from "next-intl";
export default function Search() {
    const t = useTranslations("Header")
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const searchState = useSelector((state) => state.resume.search);

    useEffect(() => {
        if (searchState) {
            setIsVisible(true);
            setIsAnimating(false);
        } else {
            setIsAnimating(true);
            setTimeout(() => setIsVisible(false), 500); 
        }
    }, [searchState]);

    useEffect(() => {        
        if (value) {
            const filtered = suggestion.filter(job => 
                job.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredJobs(filtered)
        } else {
            setFilteredJobs([])
        }
    }, [value])
    return (
        <>
            {isVisible && (
                <div className={`search ${isAnimating ? 'hide' : ''}`}>
                    <div className="search-left">
                        <img src="/img/search.png" alt="" />
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            placeholder={`${t('placeholder')}`}
                        />
                        <span className="clear-icon" onClick={() => setValue("")}>&#10006;</span>
                        {filteredJobs.length > 0 && <Suggestions filteredJobs={filteredJobs} setValue={setValue}/>}
                    </div>
                    <div className="search-right">
                        <button className="button button-primary">{t('search')}</button>
                        <Link href={'/search/vacancy/advanced'}>
                            <img src="/img/filter.png" alt="" />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}