package utils;

import java.util.Arrays;
import java.util.List;

import com.backend.smartmarks.model.Bookmark;
import com.backend.smartmarks.model.Tag;
import com.textrazor.AnalysisException;
import com.textrazor.NetworkException;
import com.textrazor.TextRazor;
import com.textrazor.annotations.AnalyzedText;
import com.textrazor.annotations.Topic;


public class Classifier {
	
	public static Set<String> autoTag(Bookmark b, String url) throws NetworkException, AnalysisException {
		
		TextRazor client = new TextRazor("ab2f1c71030b2fc1c2700f585a05cb2f41462a06748ba50a19b7f9ac");	
		
		client.addExtractor("topics");
		client.setCleanupMode("stripTags");
		client.setClassifiers(Arrays.asList("textrazor_newscodes"));
		
		try {		
			AnalyzedText response = client.analyzeUrl(url);
			List<Topic> topics = response.getResponse().getTopics();
			for (int i = 0; i < 5 || i < topics.size(); i++) {
				b.addTag(new Tag(topics.get(i).getLabel()));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return b;
		
	}
}
