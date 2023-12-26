package dev.projectFinder.server.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    private final String CLOUD_NAME = "dvnxdtrzn";
    private final String CLOUD_KEY="965687927277757";
    private final String CLOUD_SECRET_KEY="KO7zqakyewmOXu3zZuKVLyhWdsM";

    @Bean
    public Cloudinary cloudinary(){
        Map<String,String> config = new HashMap<>();
        config.put("cloud_name", CLOUD_NAME);
        config.put("api_key", CLOUD_KEY);
        config.put("api_secret", CLOUD_SECRET_KEY);
        return new Cloudinary(config);
    }
}
