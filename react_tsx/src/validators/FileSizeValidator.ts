class FileSizeValidator
{
    private fileSizeInByte :number
    private maxFileSizeInByte :number = 2097152
    constructor(fileSize:number){
        this.fileSizeInByte = fileSize
    }
    validateFileSize():boolean{
        return this.fileSizeInByte <= this.maxFileSizeInByte
    }
    getErrorMessage():string{
        return 'Maximum file Size accepted is 2MB.'
    }

}
export default FileSizeValidator