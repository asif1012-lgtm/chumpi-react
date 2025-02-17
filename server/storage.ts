import { type ValidationForm, type ConfirmationForm, type FormData } from "@shared/schema";

export interface IStorage {
  createContactForm(form: ValidationForm | ConfirmationForm): Promise<FormData>;
}

export class MemStorage implements IStorage {
  private forms: Map<number, FormData>;
  currentId: number;

  constructor() {
    this.forms = new Map();
    this.currentId = 1;
  }

  async createContactForm(form: ValidationForm | ConfirmationForm): Promise<FormData> {
    const id = this.currentId++;
    const contactForm = {
      id,
      ...form,
      createdAt: new Date()
    } as FormData;

    this.forms.set(id, contactForm);
    return contactForm;
  }
}

export const storage = new MemStorage();