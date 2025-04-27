import { RequestAdapter } from '../framework/adapters/request.adapter';
import { RequestUseCase } from '../application/use-cases/request.useCase';
import { handler } from '../lambda/lambda';
import { Context, Callback, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

describe('Testes somativa 2', () => {
  const mockEvent = {} as APIGatewayProxyEvent;
  const mockContext = {} as Context;
  const mockCallback: Callback<APIGatewayProxyResult> = () => {};

  it('RequestAdapter deve retornar "get request!"', () => {
    const adapter = new RequestAdapter();
    expect(adapter.Request()).toBe('get request!');
  });

  it('RequestUseCase deve chamar Request do Adapter', async () => {
    const mockAdapter = { Request: jest.fn().mockReturnValue('resposta mockada') };
    const useCase = new RequestUseCase(mockAdapter);

    const result = await useCase.execute();

    expect(mockAdapter.Request).toHaveBeenCalled();
    expect(result).toBe('resposta mockada');
  });

  it('handler deve retornar statusCode 200', async () => {
    const response = (await handler(mockEvent, mockContext, mockCallback)) as APIGatewayProxyResult;
    expect(response.statusCode).toBe(200);
  });

  it('handler deve retornar o message correto no body', async () => {
    const response = (await handler(mockEvent, mockContext, mockCallback)) as APIGatewayProxyResult;
    const body = JSON.parse(response.body);

    expect(body.message).toBe('get request!');
  });

  it('RequestUseCase deve lançar erro se Adapter falhar', async () => {
    const mockAdapter = { Request: jest.fn().mockImplementation(() => { throw new Error('erro no adapter') }) };
    const useCase = new RequestUseCase(mockAdapter);

    await expect(useCase.execute()).rejects.toThrow('erro no adapter');
  });
});
