import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const Footer = () => {
    return (
        <div className='absolute bottom-24 flex gap-x-4'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href={"https://github.com/favolia/next-html-host"} target='_blank'>
                            <GitHubLogoIcon className='w-6 h-6 text-white' />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>favolia/next-html-host</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                    <Link href={"https://instagram.com/defavolia"} target='_blank'>
                        <InstagramLogoIcon className='w-6 h-6 text-white' />
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>defavolia</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default Footer