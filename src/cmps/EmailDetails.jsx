import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import { emailService } from "../services/emailService";

export function EmailDetails() {
  const [mail, setMail] = useState(null);
  const params = useParams()

  useEffect(() => {
    loadMail();
  }, [params.mailId])

  async function loadMail() {
    const mail = await emailService.getMailById(params.mailId);
    setMail(mail)
  }

  return <div>Hello</div>
}