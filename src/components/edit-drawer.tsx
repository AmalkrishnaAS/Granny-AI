
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerDescription,
    DrawerTitle

} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Separator } from './ui/separator'


export const EditDrawer = ({isOpen, onClose, children}: {isOpen: boolean, onClose: any, children: any}) => {
    return (
        <Drawer
        open={isOpen}
        onClose={onClose}
        >
            <DrawerContent
            className='py-4 px-2 space-y-3'
            >
                <DrawerHeader>
                <DrawerTitle
                className='text-3xl'
                >Edit Story</DrawerTitle>
                </DrawerHeader>
              
                <Separator />
                {children}
            </DrawerContent>
         
            <DrawerFooter>
              
            </DrawerFooter>
        </Drawer>
    )
}
