import { Injectable } from '@nestjs/common';
import {Stripe,} from 'stripe';
export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem
import * as config from 'config';

@Injectable()
export class PaymentService {
     servderConfig = config.get('stripe');

    private config: Stripe.StripeConfig=null
    private stripe: Stripe = new Stripe(this.servderConfig.secret_key,this.config)
constructor(){}


async createCheckoutSession(line_items: Stripe.Checkout.SessionCreateParams.LineItem[]) : Promise<Stripe.Checkout.Session>{
    return this.stripe.checkout.sessions.create({
        payment_method_types:['card','ideal'],
        line_items,
        success_url:this.servderConfig.success_url,
        cancel_url: this.servderConfig.cancel_url
    });
}
}
