import axios from 'axios';
import { PathLike } from 'fs';
import fs from 'fs/promises';
import ms from 'ms';
import { format } from 'date-fns'; 

// Configurações
const baseUrl = 'https://sulamerica.atlassian.net/rest/api/2';
const username = 'claudio.margulhano@sulamerica.com.br';
const token = '<TOKEN>';
const credentials = `${username}:${token}`;
const authToken = Buffer.from(credentials).toString('base64');

const config = {
  headers: {
    Authorization: `Basic ${authToken}`,
    'Content-Type': 'application/json',
  },
};

const saveWorklog = async (issueKey: string, data: { comment: string; timeSpentSeconds: string; started: string; }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/issue/${issueKey}/worklog`,
      data,
      config
    );
    console.log('Horas registradas com sucesso:', response.data);
  } catch (error: any) {
    console.error('Erro ao registrar horas:', error.response.data);
  }
};

const processCSV = async (filePath: PathLike | fs.FileHandle, date: string) => {
  try {
    if (!date) {
      date = format(new Date(), "yyyy-MM-dd");
    }
    const csvData = await fs.readFile(filePath, 'utf-8');
    const lines = csvData.trim().split('\n');

    for (const line of lines) {
      if (!line.startsWith('#') && line.trim().length > 0) {
        const values = line.split(';');
        const issueKey = values[0];
        const timeSpentSeconds = `${ms(values[1]) / 1000}`;
        const comment = values[2];

        const data = {
          comment,
          timeSpentSeconds,
          started: `${date}T08:30:00.000+0000`,
        };

        console.log(data);
        await saveWorklog(issueKey, data);
      }
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo CSV:', error);
  }
};

const csvFilePath = 'worklog.csv';
const date = process.argv[2];

processCSV(csvFilePath, date);
