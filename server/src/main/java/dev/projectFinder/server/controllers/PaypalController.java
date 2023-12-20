package dev.projectFinder.server.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import dev.projectFinder.server.models.Order;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.services.PaypalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/payment")
@RequiredArgsConstructor
public class PaypalController {
    @Autowired
    PaypalService service;
    public static final String SUCCESS_URL = "/pay/success";
    public static final String CANCEL_URL = "/pay/cancel";
    @GetMapping("/concec")
    public String home(){
        return "home";
    }
    //@PostMapping("/pay")
    @RequestMapping(value = "/pay", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String payment(@Valid @RequestBody Order order) {
        try {
            Payment payment = service.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
                    order.getIntent(), order.getDescription(), "http://localhost:8088/api/v1/payment" + CANCEL_URL,
                    "http://localhost:5173/Organizer/payment/success/" + order.getVacancyId());
            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    return "" + link.getHref();
                }
            }

        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }
        return "redirect:/";
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "cancel";
    }

    @PostMapping(value = SUCCESS_URL)
    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestBody Vacancy vacancy) {
        try {
            if(vacancy.getVacancyId() != null){
                Payment payment = service.executePayment(paymentId, payerId);
                if (payment.getState().equals("approved")) {
                    service.saveHistotyPayment(payment.toJSON(), vacancy);
                    return payment.toJSON();
                }
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return "redirect:/";
    }
}