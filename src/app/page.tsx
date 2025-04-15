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
    <div className="flex h-screen bg-gray-50 w-full items-center justify-center">
      <div className="h-[95%] py-10 shadow-2xl rounded-2xl bg-white w-[90%] flex items-center justify-center">
        <div className="lg:w-[50%] md:w-[75%] h-[95%] w-[75%] justify-center items-center flex flex-col">
          {user ? (
              user.status ? (
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold text-green-600">Usuário Liberado!</h2>
                  <p className="mt-2 text-lg text-black">Nome: {user.nome}</p>
                  <img src={user.imagem_url} alt="" />
                  <p className="mt-2 text-lg text-gray-700">Tenha um ótimo treino!</p>
                </div>
              ) : (
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold text-red-600">Usuário Bloqueado!</h2>
                  <p className="mt-2 text-lg text-black">Nome: {user.nome}</p>
                  <img src={user.imagem_url} alt="" />
                  <p className="mt-2 text-lg text-gray-700">Por favor diriga-se na secretaria!</p>
                </div>
              )
           
          ) : notFound == true ? (
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-red-600">Usuário não Encontrado!</h2>
              <p className="mt-2 text-lg text-black">Verifique o CPF digitado.</p>
              <p className="mt-2 text-lg text-gray-700">Não tem cadastro? procure na secretaria!</p>

            </div>
          ) : (
            <>
              <div className="input-text w-[75%] h-[20%]">
                <input
                  type="number"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCPF(e.target.value)}
                  className="focus:outline-none focus:border-none w-full focus:ring-2 focus:ring-blue-800 text-xl border-2 text-blue-500 border-blue-500 text-center rounded h-15 lg:h-10"
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
                      className="border-2 cursor-pointer text-xl bg-blue-500 border-blue-500 hover:bg-transparent hover:text-blue-500 rounded w-12 h-12 md:w-18 md:h-18 lg:w-18 lg:h-18"
                    />
                  ))}
                </div>

                <div className="inputs-confirm items-center justify-around flex w-full h-[15%]">
                  <input
                    type="button"
                    value="Validar"
                    onClick={handleValidateCPF}
                    className="hover:text-green-500 hover:bg-transparent transition-all cursor-pointer w-[45%] h-[75%] bg-green-500 border-green-500 border-2 rounded-md"
                  />
                  <input
                    type="button"
                    value="Limpar"
                    onClick={() => setCPF('')}
                    className="hover:text-red-500 hover:bg-transparent transition-all cursor-pointer w-[45%] h-[75%] bg-red-500 border-red-500 border-2 rounded-md"
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
