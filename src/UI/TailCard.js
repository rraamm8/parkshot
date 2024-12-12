import React from 'react'

export default function TailCard({imgUrl, title, content, kw}) {
    // let kwArr = [];
    // if (kw.includes(',')){
    //     kws = kw.split(',')
    // }
    // else {
    //     kws.push(kw);
    // }

    const kws = kw.includes(',') ? kw.split(',')
                                : [kw];

    const kwTags = kws.map(item => <span key={item}
                                        className="inline-flex bg-slate-200
                                        text-sm font-bold
                                        p-2 m-1 rounded-xl">
                                    {item}
                                    </span>);
    console.log(kws)

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
                <img className="rounded-t-lg h-60"
                src={imgUrl}
                alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">
                    {content}
                </p>
                <a href="#" className="inline-flex items-center px-3 py-2 
                            text-sm font-medium text-center text-white 
                            bg-blue-700 rounded-lg hover:bg-blue-800 
                            focus:ring-4 focus:outline-none focus:ring-blue-300">
                    {kw}
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
                            stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    )
}
