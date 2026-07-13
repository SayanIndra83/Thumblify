import { motion } from "motion/react"
import { useSession } from "next-auth/react"
import { useState } from "react"


function GenerateClient() {
    const session = useSession()
    const user = session.data?.user
    const [title, setTitle] = useState("")
    const [additionalDetails, setAdditionalDetails] = useState("")
    // const [""]
  return (
    <div>
      
    </div>
  )
}

export default GenerateClient
