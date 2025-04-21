'use client'

import { useState } from "react"
import { Delete } from 'lucide-react'
interface User {
  id: number
  nome: string
  imagem_url: string
  status: boolean
  cpf: string
}
export default function Home() {
  const [cpf, setCPF] = useState('')
  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    if (raw.length <= 11) {
      const formatted = raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
      e.target.value = formatted;
      setCPF(raw)
    }
  }
  
  const [notFound, setNotFound] = useState(false)
  const [user, setUser] = useState<User | null>(null);
  const handleValidateCPF = async () => {
    setNotFound(false)
    const response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/cpf/${cpf}`)
    if (!response.ok) {
      if (response.status === 404) {
        setUser(null)
        setNotFound(true)
        setTimeout(() => {
          setNotFound(false)
        }, 2000)
      } else {
        console.log(`Erro ${response.status}: ${response.statusText}`)
      }
      return
    }

    const data = await response.json()
    setUser(data)

    setTimeout(() => {
      setUser(null)
    }, 2000)
  }

  return (
    <div className="flex  h-screen bg-black w-full items-center justify-center text-white">
      <div className="h-[95%] py-10 shadow-2xl rounded-2xl bg-[#0d0d0d] border border-[#2a2a2a] w-[90%] flex items-center justify-center">
        <div className="lg:w-[50%] md:w-[75%] h-[95%] w-[75%] justify-center items-center flex flex-col">

          {user ? (
            user.status ? (
              <div className="mb-4 text-center flex flex-col items-center gap-4">
              <h2 className="text-4xl text-lime-500">Acesso Liberado</h2>
            
              <div className="  rounded-xl shadow-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={user.imagem_url}
                    alt={`Foto de ${user.nome}`}
                    className="w-40 h-40 object-cover rounded-full border-2 border-lime-500 shadow-lg"
                  />
                  <div className="text-white text-lg font-medium">
                    <p><span className="font-semibold text-gray-400">Nome:</span> {user.nome}</p>
                    <p><span className="font-semibold text-gray-400">CPF:</span> {user.cpf}</p>
                  </div>
                </div>
                <p className="mt-6 text-center text-gray-400 text-base italic">Tenha um ótimo treino!</p>
              </div>
            </div>
            ) : (
              <div className="mb-4 text-center flex flex-col items-center gap-4">
              <h2 className="text-4xl text-red-500">Acesso Negado</h2>
             <div className=" rounded-xl shadow-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={user.imagem_url}
                    alt={`Foto de ${user.nome}`}
                    className="w-40 h-40 object-cover rounded-full border-2 border-red-500 shadow-lg"
                  />
                  <div className="text-white text-lg font-medium">
                    <p><span className="font-semibold text-gray-400">Nome:</span> {user.nome}</p>
                  </div>
                </div>
                <p className="mt-6 text-center text-gray-400 text-base italic">Dirija-se à secretaria para mais informações.</p>
              </div>
            </div>
            )
          ) : notFound === true ? (
            <div className="mb-4 text-center flex flex-col items-center gap-4">
            <h2 className="text-4xl text-yellow-400">Usuário Não Encontrado</h2>
              <div className="  rounded-xl shadow-lg p-6 w-full max-w-md">
              <div className="text-white text-lg font-medium space-y-2">
                <p>Verifique o CPF digitado.</p>
                <p className="text-gray-400 italic">Não tem cadastro? Procure a secretaria!</p>
              </div>
            </div>
          </div>
          ) : (
            <>
            <h1 className="text-3xl mb-10 text-center text-white">Bem vindo a Pulse Fit!</h1>
          
            <div className="mb-5 input-text w-[70%] h-[20%]">
              <input
                type="text"
                max={11}
                placeholder="CPF"
                value={cpf.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')}
                required
                onChange={handleCPFChange}
                className="w-full text-center p-2 text-xl rounded-xl border h-12 border-gray-500 bg-transparent text-gray-200 placeholder-gray-400 
                           transition duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 hover:border-lime-500"
              />
            </div>
          
            <div className="inputs w-[75%] h-[90%] flex flex-col">
              <div className="button-number flex flex-wrap gap-4 items-center justify-center w-full h-[50%] mb-15">
                {[...Array(10)].map((_, i) => (
                  <input
                    key={i}
                    type="button"
                    value={i}
                    onClick={() => setCPF(cpf + i)}
                    className="border-2 cursor-pointer text-xl text-gray-200 border-gray-500 bg-transparent rounded-full 
                               w-12 h-12 md:w-20 md:h-20 transition duration-300 
                               hover:bg-lime-600 hover:text-white hover:border-lime-600 hover:shadow-lg hover:shadow-lime-500/30"
                  />
                ))}
              <button
                  onClick={() => setCPF((prev) => prev.slice(0, -1))}
                  className="border-2 cursor-pointer text-xl border-red-500 text-red-500 bg-transparent rounded-full w-12 h-12 md:w-20 md:h-20 flex items-center justify-center transition duration-30 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-lg hover:shadow-red-400/30">
                  <Delete size={24} />
              </button>
              </div>
          
              <div className="mt-10 xl:mt-15 inputs-confirm items-center justify-around flex w-full h-[15%]">
                <input
                  type="button"
                  value="Validar"
                  onClick={handleValidateCPF}
                  className="cursor-pointer w-[45%] h-[70%] bg-transparent border-2 border-lime-600 rounded-xl text-lime-600 
                             transition duration-300 hover:bg-lime-600 hover:text-white hover:shadow-lg hover:shadow-lime-500/30"
                />
                <input
                  type="button"
                  value="Limpar"
                  onClick={() => setCPF('')}
                  className="cursor-pointer w-[45%] h-[70%] bg-transparent border-2 border-red-500 rounded-xl text-red-500 
                             transition duration-300 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/30"
                />
              </div>
            </div>
          </>
          
          )}
        </div>
      </div>
    </div>
  );
}
