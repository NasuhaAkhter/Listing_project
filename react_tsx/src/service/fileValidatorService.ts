
interface ValidatorResponse{
    isValid:boolean,
    errorMessage:string
}


async function  validateFileSize(fileSize:number): Promise<ValidatorResponse> {
    const fileSizeValidator = (await import('../validators/FileSizeValidator')).default
    const validator = new fileSizeValidator(fileSize)
    const isValid = validator.validateFileSize()
    return {
        isValid, 
        errorMessage : isValid? '' : validator.getErrorMessage()
    }
    
}

export {
    validateFileSize
}