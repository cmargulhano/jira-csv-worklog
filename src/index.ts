import axios from 'axios';
import { PathLike } from 'fs';
import fs from 'fs/promises';
import ms from 'ms';

// Configurações
const baseUrl = 'https://sulamerica.atlassian.net/rest/api/2';
const username = '<EMAIL>';
// Gerar token em https://id.atlassian.com/manage-profile/security/api-tokens
const token = '<TOKEN>';
const credentials = `${username}:${token}`;
const authToken = Buffer.from(credentials).toString('base64');

const config = {
  headers: {
    Authorization: `Basic ${authToken}`,
    'Content-Type': 'application/json',
  },
};

// Função para registrar trabalho
const saveWorklog = async (issueKey: string, data: { comment: string; timeSpentSeconds: string; }) => {
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

// Processamento do CSV
const processCSV = async (filePath: PathLike | fs.FileHandle) => {
  try {
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
        };

        await saveWorklog(issueKey, data);
      }
    }
  } catch (error) {
    console.error('Erro ao processar o arquivo CSV:', error);
  }
};

const csvFilePath = 'worklog.csv';
processCSV(csvFilePath);