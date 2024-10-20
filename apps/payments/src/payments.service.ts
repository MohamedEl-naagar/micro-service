import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateChargeDto } from '../dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    'sk_test_51PARxZP6SrcHvNF5iNunn0YsEtwKe8zaIyWtjcggz7DGdEThnKGBv1hhwVwJceFA5hmuiB2u5EpmNhD0gxsOG1XJ00DhAbmw2I',
  );

  async createCharge({ card, amount }: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    return paymentIntent;
  }
}
