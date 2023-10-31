import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import axios from "axios";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";

type Enterprise = {
  id: string,
  cnpj: string,
  name: string,
  isActive: boolean,
  phone: string,
  cep: string,
  email: string,
  fantasyName: string,
  street: string,
  number: string,
  county: string,
  neighborhood: string,
  uf: string,
  created_at: string,
}

type DataResponse = {
  enterprise: Enterprise
}

function App() {
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [cnpj, setCnpj] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCnpj(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3000/enterprises`, {
        cnpj
      }, {headers: {
        'Access-Control-Allow-Origin': '*'
      }})
     
      const { data } = await axios.get<DataResponse>(`http://localhost:3000/enterprises/${cnpj}`)
  
      const { enterprise } = data
  
      setEnterprise(enterprise)
    } catch (error) {
      console.error(error)
    }
  };


  return (
    <div className=" px-4 py-5 justify-content align-items">
      <form
        id="consultaCnpj"
        onSubmit={handleSubmit}
        method="post"
        className="flex gap-4"
      >
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="inputConsultaCnpj">CNPJ da empresa</Label>
            <Input
              id="inputConsultaCnpj"
              name="inputConsultaCnpj"
              type="text"
              value={cnpj}
              onChange={handleChange}
              placeholder="Digite o CNPJ da empresa"
            />
          </div>
          <Button type="submit"> Enviar CNPJ</Button>
        </div>
      </form>
      <div>
        {enterprise && (
          <div>
            <div
              data-is-active={enterprise.isActive}
              className="my-4 py-2 data-[is-active=true]:bg-green-400 bg-red-400"
            >
              <p>Situação: {enterprise.isActive === true ? 'Ativa' : 'Inativa'}</p>
            </div>
            <div className="flex gap-4 items-start flex-col">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                disabled
                placeholder={enterprise.name}
              />
              <Label htmlFor="fantasia">Nome Fantasia</Label>
              <Input
                id="fantasia"
                name="fantasia"
                type="text"
                disabled
                placeholder={
                  enterprise.fantasyName ? enterprise.fantasyName :  "NÃO TEM NOME FANTASIA"
                }
              />
              <Label htmlFor="logradouro">Logradouro</Label>
              <Input
                id="logradouro"
                name="logradouro"
                type="text"
                disabled
                placeholder={enterprise.street + " " + enterprise.number}
              />
              <Label htmlFor="municipio">Municipio</Label>
              <Input
                id="municipio"
                name="municipio"
                type="text"
                disabled
                placeholder={enterprise.county}
              />
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                name="bairro"
                type="text"
                disabled
                placeholder={enterprise.neighborhood}
              />
              <Label htmlFor="uf">UF</Label>
              <Input
                id="uf"
                name="uf"
                type="text"
                disabled
                placeholder={enterprise.uf}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
