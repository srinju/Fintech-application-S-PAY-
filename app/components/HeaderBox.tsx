"use client"

export const HeaderBox = ({type,title,user,subtext} : {
    title : string,
    type? : "title" | "greeting",
    user? : string,
    subtext : string
}) => {
    return (
        <div className="header-box">
            <h1 className="header-box-title">
                {title}
                {type === "greeting" && (
                    <span className="text-bankGradient">
                        &nbsp;{user}
                    </span>
                )}
            </h1>
            <p className="header-box-subtext">
                {subtext}
            </p>
        </div>
    )
}