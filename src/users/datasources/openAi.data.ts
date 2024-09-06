import axios, { AxiosResponse } from 'axios';
import { chatDto, OpenAIResponse } from '../interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiData {
  constructor(private readonly configService: ConfigService) {}

  async makeRequest(data: chatDto): Promise<string> {
    const { content } = data;
    try {
      const response: AxiosResponse<OpenAIResponse> = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content }],
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get<string>('OPENAI_API_KEY')}`,
          },
        },
      );
      return response.data.choices[0].message.content;
    } catch (error: any) {
      if (error.response) {
        console.error('Error de respuesta:', error.response.data);
      }
    }
  }
}
