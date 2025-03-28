import {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Rating from '@/components/common/Rating';
import type {ProductDetail} from '@/types';

function ReviewItem({review}: {review: ProductDetail['reviews'][0]}) {
  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{review.reviewerName}</Text>
        <Rating value={review.rating} />
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
      <Text style={styles.reviewDate}>
        {new Date(review.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  reviewComment: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 8,
  },
  reviewDate: {
    color: '#888',
    fontSize: 12,
  },
});

export default memo(ReviewItem);
