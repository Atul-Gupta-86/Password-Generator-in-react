import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [includeNumber, setIncludeNumber] = useState(false)
  const [includeCharacter, setIncludeCharacter] = useState(false)
  const [password , setPassword] = useState("")



  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(includeNumber) str += "1234567890"
    if(includeCharacter) str += "!@#$%&*()_+-=`~|?"

    for (let index = 1; index <= length; index++) {
      const ran = Math.floor((Math.random()* (str.length-1)) + 1)
      pass += str[ran]
    }


    setPassword(pass)
  }, [length, includeCharacter, includeNumber]  )
    
  useEffect( () => {
    passwordGenerator()
  },[length, includeCharacter, includeNumber, passwordGenerator ])

  const passwordRef = useRef(null)

  const copyToClipboard = useCallback( () => {
    // passwordRef.current?.select() -------> this and below code were used earlier to copy things as these were prerequisite to copy --> 1st select the text which is needed to be copied. then use <<document.execCommand('copy')>>
    // passwordRef.current?.setSelectionRange(0,length) -------^


    // window.navigator.clipboard.writeText(passwordRef?.current.value.substring(0, 12))     // To copy only fixed length of the password
    window.navigator.clipboard.writeText(password)
  }, [password]) 

  return (
    <>
      <div className='bg-blue-300 m-auto p-4 w-150 rounded-2xl mt-10'>
        <div className='text-center text-2xl'>
          Password Generator          
        </div>
        <div className='flex'>
          <input type="text" value={password} placeholder='Password' readOnly ref={passwordRef} className='w-130 rounded-l-2xl p-2 bg-white'/>
          <button className='bg-blue-900 rounded-r-2xl w-20 p-1 m-0' onClick={copyToClipboard}>Copy</button> 
        </div>
        <div className='flex gap-5'>
          <div className='flex gap-2'>
            <input type="range" id='passLength' min={8} max={20} value={length} onChange={(e) => {setLength(e.target.value)}}/>
            <label htmlFor="passLength" className='text-orange-500 font-medium'>Length: {length}</label>
            <label ></label>
          </div>
          <div>
            <input 
              type="checkbox" 
              id='charInput' 
              defaultChecked={includeCharacter} 
              onChange={() => {
                setIncludeCharacter((prev) => !prev)
              }} />
            <label htmlFor='charInput' className='text-orange-500 font-medium'> Character</label>
          </div>
          <div>
            <input 
            type="checkbox" 
            id='numberInput' 
            defaultChecked={includeNumber}
            onChange={() => {
              setIncludeNumber((prev) => !prev)
            }}/>
            <label htmlFor="numberInput" className='text-orange-500 font-medium'> Number</label>
          </div>      
        </div>
      </div>
    </>
  )

}

export default App