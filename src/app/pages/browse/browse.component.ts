import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando o CommonModule
import { ApiFilmesService } from '../servicos/api-filmes.service'; // Seu serviço para buscar os filmes

@Component({
  selector: 'app-browse',
  standalone: true,  // Definindo o componente como independente
  imports: [CommonModule], // Adicionando o CommonModule aos imports
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent {
  
  filmeService = inject(ApiFilmesService); // Injeção do serviço
  popularMovie: any[] = []; // Array para armazenar filmes
  currentPage: number = 1; // Página atual de filmes
  totalPages: number = 1; // Número total de páginas, que a API retorna

  IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
  IMAGE_SIZE = "w500"; // Tamanho das imagens

  ngOnInit() {
    this.loadMovies(); // Carregar os filmes ao inicializar o componente
  }

  loadMovies() {
    this.filmeService.getPopularMovies(this.currentPage).subscribe((result: any) => {
      console.log(result); // Para depuração
      this.popularMovie = [...this.popularMovie, ...result.results]; // Adiciona os filmes à lista existente
      this.totalPages = result.total_pages; // Armazena o número total de páginas
    });
  }

  loadMoreMovies() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++; // Incrementa para a próxima página
      this.loadMovies(); // Carrega filmes da próxima página
    }
  }

  // Função para criar a URL completa das imagens
  getImageUrl(path: string): string {
    return `${this.IMAGE_BASE_URL}${this.IMAGE_SIZE}${path}`;
  }
}
