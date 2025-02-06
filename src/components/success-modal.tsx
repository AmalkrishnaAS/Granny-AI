import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger

} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from './ui/separator'
import {useRouter} from 'next/navigation'

export function SuccessModal({ isOpen, onClose }: { isOpen: boolean, onClose: any }) {
    const router = useRouter()
    return (
       
       <Dialog
       open={isOpen}
       
       >
        <DialogContent
        className='p-8 space-y-6'
        >
            <DialogHeader>
                <DialogTitle
                className='text-3xl text-center'
                >Story Created !
                
                </DialogTitle>
                
            </DialogHeader>
            <DialogDescription
            className='text-center text-xl'
            >
                <div className="flex items-center justify-center flex-col space-y-4">
                    <div className="flex items-center justify-center text-7xl mb-4">
                    🥳
                    </div>
                Check out what Granny has cooked up for you !
                </div>
            </DialogDescription>
         
            <div className="flex justify-end">
               <div className="flex">
                <Button onClick={onClose} className="mr-4"
                size={"lg"}
                >Close</Button>
                <Button
                size={"lg"}
                onClick={() => {
                    onClose()
                    router.push('/')
                }
                }
                >View Story</Button>
               </div>
            </div>
        </DialogContent>
       </Dialog>
       
    )
}