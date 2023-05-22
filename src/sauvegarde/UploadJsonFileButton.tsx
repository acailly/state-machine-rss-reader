import { Button } from '@chakra-ui/react'
import { PropsWithChildren, ChangeEvent, useCallback, useRef } from 'react'

interface UploadJsonFileButtonProps extends PropsWithChildren {
  onUploaded(content: object): void
}

// Inspired by https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
// Inspired by https://web.dev/read-files/
const UploadJsonFileButton = ({ onUploaded, children }: UploadJsonFileButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const onFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (fileList?.length) {
        const file = fileList[0]
        const reader = new FileReader()
        reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
          const text = event.target?.result
          if (text) {
            const json = JSON.parse(text.toString())
            if (fileInputRef.current) {
              fileInputRef.current.value = ''
            }
            onUploaded(json)
          }
        })
        reader.readAsText(file)
      }
    },
    [onUploaded]
  )

  return (
    <>
      <input ref={fileInputRef} type="file" accept="text/json" style={{ display: 'none' }} onChange={onFileChange} />
      <Button id="fileSelect" type="button" colorScheme="blue" variant="outline" onClick={onClick}>
        {children}
      </Button>
    </>
  )
}

export default UploadJsonFileButton
