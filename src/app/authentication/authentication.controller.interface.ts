﻿import express from 'express';

export interface IRequest extends express.Request {
  token: string;
}
