package com.ict.traveljoy.history.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ict.traveljoy.history.repository.SearchHistory;
import com.ict.traveljoy.history.repository.SearchHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchHistoryService {

	private final SearchHistoryRepository searchHistoryRepository;
	private final ObjectMapper objectMapper;



	public List<SearchHistoryDTO> getAll() {
		List<SearchHistory> searchHistoryList = searchHistoryRepository.findAll();

		return searchHistoryList.stream().map(history->SearchHistoryDTO.toDTO(history)).collect(Collectors.toList());
	}

	public SearchHistoryDTO removebyId(long id) {
		if(searchHistoryRepository.existsById(id)) {
			SearchHistory history = searchHistoryRepository.findById(id).get();
			searchHistoryRepository.deleteById(id);
			return SearchHistoryDTO.toDTO(history);
		}
		else throw new IllegalArgumentException("오류");
	}


	public SearchHistoryDTO removeAll() {
//		searchHistoryRepository.getReferenceById(null)
		searchHistoryRepository.deleteAll();
		return null;
	}


}
