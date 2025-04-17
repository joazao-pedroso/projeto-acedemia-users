'use client'

import { useState } from "react";

export default function Home() {
  const [cpf, setCPF] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleValidateCPF = async () => {
    setNotFound(false)
    let response = await fetch(`https://api-academia-alpha.vercel.app/gym/user/cpf/${cpf}`)
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

    let data = await response.json()
    setUser(data)

    setTimeout(() => {
      setUser(null)
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-black w-full items-center justify-center text-white">
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
              <h1 className="text-3xl mb-10">Bem vindo a Pulse Fit!</h1>
              <div className="mb-5 input-text w-[70%] h-[20%]">
                <input
                  type="number"
                  placeholder="CPF"
                  value={cpf}
                  required
                  max={11}
                  onChange={(e) => setCPF(e.target.value)}
                  className="w-full p-2 text-xl rounded-xl border h-12  border-gray-200 bg-transparet text-gray-200 placeholder-gray-400"
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
                      className="border-2 hover:border-gray-500 cursor-pointer text-xl bg-transparent hover:bg-transparent text-gray-200 hover:text-gray-500 border-gray-200  rounded-[50%] w-12 h-12 md:w-20 md:h-20 lg:w-18 lg:h-18"
                    />
                  ))}
                </div>
                  
                <div className="mt-10 xl:mt-0 inputs-confirm items-center justify-around flex w-full h-[15%]">
                  <input
                    type="button"
                    value="Validar"
                    onClick={handleValidateCPF}
                    className="hover:text-white hover:bg-lime-600 cursor-pointer w-[45%] h-[70%] bg-transparent border-lime-600 border-2 rounded-xl text-lime-600"
                  />
                  <input
                    type="button"
                    value="Limpar"
                    onClick={() => setCPF('')}
                    className="text-red-500 bg-transparent transition-all cursor-pointer w-[45%] h-[70%] hover:bg-red-600 border-red-500 border-2 rounded-xl hover:text-white"
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
