package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @GetMapping("/movies")
    public String getMovies(@RequestParam(defaultValue = "1") String page) {
        String url = "https://api.themoviedb.org/3/movie/popular?api_key=3798915f97f9307b0382d48e1d9f28ae&page=" + page;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    @GetMapping("/search")
    public String searchMovies(@RequestParam String query) {
        String formattedQuery = query.replace(" ", "%20");
        String url = "https://api.themoviedb.org/3/search/movie?api_key=3798915f97f9307b0382d48e1d9f28ae&query=" + formattedQuery;
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    @GetMapping("/movie/{id}")
    public String getMovie(@PathVariable String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=3798915f97f9307b0382d48e1d9f28ae";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }

    @GetMapping("/movie/{id}/credits")
    public String getCredits(@PathVariable String id) {
        String url = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=3798915f97f9307b0382d48e1d9f28ae";
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}