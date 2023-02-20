import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { v4 as uuid } from "uuid";

// console.log(process.env.LOCAL_HOST_KEY);

const app = express();
app.use(express.json());

const data = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

app.get("/all", (req, res) => {
  return res.status(200).json(data);
});

app.post("/create", (req, res) => {
  const info = { ...req.body, id: uuid() };
  data.push(info);
  return res.status(200).json(info);
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  let index;
  const infoUpdate = data.find((currentData, i) => {
    index = i;
    return currentData.id === id;
  });

  data[index] = { ...infoUpdate, ...req.body }; //substituindo o elemento antigo pelo novo de forma fácil

  return res.status(200).json(data);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let index;
  const infoDelete = data.find((currentData, i) => {
    index = i;
    return currentData.id === id;
  });
  if (infoDelete) {
    data.splice(index, 1);
    return res.status(200).json({ messege: "Info deleted" });
  } else {
    return res.status(404).json({ message: "Info not found" });
  }
});

app.get("/process/:id", (req, res) => {
  const { id } = req.params;

  const infoProcess = data.find((currentData) => {
    return currentData.id === id;
  });
  if (infoProcess) {
    return res.status(200).json(infoProcess);
  } else {
    return res.status(404).json({ message: "Info not found" });
  }
});

app.put("/addComment/:id", (req, res) => {
  const { id } = req.params;
  let index;
  const infoUpdate = data.find((currentData, i) => {
    index = i;
    return currentData.id === id;
  });

  infoUpdate.comments.push(req.body.comment); // no body da request precisa de passar o "comment": "comentário a ser enviado"
  data[index] = { ...infoUpdate };

  return res.status(200).json(data[index]);
});

app.get("/emAndamento", (req, res) => {
  const infoProcess = data.filter((currentData) => {
    return currentData.status.toLowerCase() === "em andamento";
  });
  if (infoProcess) {
    return res.status(200).json(infoProcess);
  } else {
    return res.status(404).json({ message: "Info not found" });
  }
});

app.get("/finalizado", (req, res) => {
  const infoProcess = data.filter((currentData) => {
    return currentData.status.toLowerCase() === "finalizado";
  });
  if (infoProcess) {
    return res.status(200).json(infoProcess);
  } else {
    return res.status(404).json({ message: "Info not found" });
  }
});

app.get("/setor/:setor", (req, res) => {
  const infoProcess = data.filter((currentData) => {
    return currentData.setor.toLowerCase() === req.params.setor.toLowerCase();
  });

  if (infoProcess) {
    return res.status(200).json(infoProcess);
  } else {
    return res.status(404).json({ message: "Info not found" });
  }
});

app.get("/random", (req, res) => {
  let randomElement = data[Math.floor(Math.random() * data.length)];
  return res.status(200).json(randomElement);
});

app.listen(process.env.LOCAL_HOST_KEY, () => {
  console.log(
    `Server is running on http://localhost:${process.env.LOCAL_HOST_KEY}`
  );
});
