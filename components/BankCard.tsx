import Image from "next/image"
import Link from "next/link"


export const BankCard = ({account,userName,showBalance}: CreditCardProps) => {


    return (
        <div>
            <Link href="/asdasda">
                <div className="w-50 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 border-black-2">
                
                <img 
                    className="relative object-cover w-full h-full rounded-xl" 
                    src="https://i.imgur.com/kGkSg1v.png"
                    width={25}
                    height={25} 
                    alt="asdsd" 
                />
                
                <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                        <div className="">
                            <p className="font-light">
                                Name
                            </p>
                            <p className="font-medium tracking-widest">
                                {account.name || userName}
                            </p>
                        </div>
                        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                    </div>
                    <div className="pt-1">
                        <p className="font-light">
                            Card Number
                        </p>
                        <p className="font-medium tracking-more-wider">
                            {`●●●● ●●●● ●●●● ${account.mask}`}
                        </p>
                    </div>
                    <div className="pt-6 pr-6">
                        <div className="flex justify-between">
                            <div className="">
                                <p className="font-light text-xs">
                                    Valid
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    11/15 {/*add dynamic valid date here*/}
                                </p>
                            </div>
                            <div className="">
                                <p className="font-light text-xs text-xs">
                                    Expiry
                                </p>
                                <p className="font-medium tracking-wider text-sm">
                                    03/25 {/* add dynamic expiry date here*/}
                                </p>
                            </div>

                            <div className="">
                                <p className="font-light text-xs">
                                    CVV 
                                </p>
                                <p className="font-bold tracking-more-wider text-sm">
                                    ···
                                </p>
                            </div>
                        </div>
                     </div>
                    </div>
                </div>
            </Link>
        </div>
        
    )
}