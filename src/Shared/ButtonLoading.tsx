import { LoadingButton } from "@mui/lab"
import { useTable } from "../contexts/useTable"


const ButtonLoading = () => {
    const { loading } = useTable()

    return (
        <>
            {
            loading ? 
                <LoadingButton loading variant="text">
                    T
                </LoadingButton> : ''
            }
        </>
    )
}

export default ButtonLoading