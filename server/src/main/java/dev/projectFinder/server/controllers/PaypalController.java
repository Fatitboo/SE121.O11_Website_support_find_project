package dev.projectFinder.server.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import dev.projectFinder.server.models.Order;
import dev.projectFinder.server.models.ProjectOrder;
import dev.projectFinder.server.models.Vacancy;
import dev.projectFinder.server.services.PaypalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

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
    // https://afraid-quilt-production.up.railway.app
    // https://findproject.21522448host.id.vn
    //@PostMapping("/pay")
//    @RequestMapping(value = "/pay", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
    @PostMapping("/pay")
    public String payment(@Valid @RequestBody Order order) {
        try {
                System.out.println("[POST_VACANCY_ID]: " + order.getVacancyId());
            Payment payment = service.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
                    order.getIntent(), order.getDescription(), "https://afraid-quilt-production.up.railway.app" + CANCEL_URL,
                     "https://afraid-quilt-production.up.railway.app" + SUCCESS_URL + "/" + order.getVacancyId() + "/" + order.getLength());
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
    public RedirectView cancelPay() {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("https://findproject.21522448host.id.vn/Organizer/payment/cancel");
        return redirectView;
    }

    @GetMapping("/pay/success/{vacancyId}/{length}")
    public RedirectView successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @PathVariable String vacancyId, @PathVariable int length) {
        try {
            System.out.println("[VACANCY_ID]: " + vacancyId);
            if(vacancyId != null){
                Payment payment = service.executePayment(paymentId, payerId);
                if (payment.getState().equals("approved")) {
                    service.saveHistotyPayment(payment.toJSON(), vacancyId, length);
                    RedirectView redirectView = new RedirectView();
                    redirectView.setUrl("https://findproject.21522448host.id.vn/Organizer/payment/success");

                    return redirectView;
                }
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("https://findproject.21522448host.id.vn/Organizer/payment/cancel");
        return redirectView;
    }


    //Project


    public static final String SUCCESS_PROJECT_URL = "/pay/project/success";
    public static final String CANCEL_PROJECT_URL = "/pay/project/cancel";
    @PostMapping("/project/pay")
    public String paymentProject(@Valid @RequestBody ProjectOrder order) {
        try {
            System.out.println("[POST_Project_ID]: " + order.getProjectId());
            Payment payment = service.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
                    order.getIntent(), order.getDescription(), "https://afraid-quilt-production.up.railway.app" + CANCEL_PROJECT_URL + "/" + order.getProjectId(),
                    "https://afraid-quilt-production.up.railway.app" + SUCCESS_PROJECT_URL + "/" + order.getProjectId() + "/" + order.getLength());
            service.updateProject(order.getDetail(), order.getProjectId());
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

    @GetMapping("/pay/project/cancel/{projectId}")
    public RedirectView cancelProjectPay(@PathVariable String projectId) {
        RedirectView redirectView = new RedirectView();
        service.removeDetailPayment(projectId);
        redirectView.setUrl("https://findproject.21522448host.id.vn/Organizer/payment/project/cancel");
        return redirectView;
    }

    @GetMapping("/pay/project/success/{projectId}/{length}")
    public RedirectView successProjectPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @PathVariable String projectId, @PathVariable int length) {
        try {
            System.out.println("[PROJECT_ID]: " + projectId);
            if(projectId != null){
                Payment payment = service.executePayment(paymentId, payerId);
                if (payment.getState().equals("approved")) {
                    service.saveHistotyProjectPayment(payment.toJSON(), projectId, length);
                    RedirectView redirectView = new RedirectView();
                    redirectView.setUrl("https://findproject.21522448host.id.vn/Organizer/payment/project/success");

                    return redirectView;
                }
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        RedirectView redirectView = new RedirectView();
        service.removeDetailPayment(projectId);
        redirectView.setUrl("https://findproject.21522448host.id.vn/Organizer/payment/project/cancel");
        return redirectView;
    }


}
